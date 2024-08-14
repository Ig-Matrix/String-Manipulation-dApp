// XXX even though ethers is not used in the code below, it's very likely
// it will be used by any DApp, so we are already including it here
const { ethers } = require("ethers");

const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);

// HELPER FUNCTIONS
function hex2str(hex) {
   return ethers.toUtf8String(hex);
}

function str2hex(payload) {
   return ethers.hexlify(ethers.toUtf8Bytes(payload));
}

function reverseString(str) {
   return str.split("").reverse().join("");
}

function countWords(str) {
   return str.trim().split(/\s+/).length;
}

// STATE VARIABLES TO KEEP TRACK OF STATISTICS
let totalCharacters = 0;
let totalWords = 0;
let longestString = "";

async function handle_advance(data) {
   console.log("Received advance request data " + JSON.stringify(data));

   const metadata = data["metadata"];
   const payload = data["payload"];

  //  CONVERT RECEIVED PAYLOAD FROM HEX TO STRING
   const originalString = hex2str(payload);

  //  REVERSE THE STRING
   const reversedString = reverseString(originalString);

  //  UPDATE TOTAL CHARACTERS AND EORDS
   totalCharacters += originalString.length;
   totalWords += countWords(originalString);

  //  CHECKS IF THE ORIGINAL STRING IS LONGER THAN THE LONGEST STRING VARIABLE AND UPATES THE VALUE OF THE LONGEST TRING TO IT
   if (originalString.length > longestString.length)
      longestString = originalString;

  //  SEND THE VALUE OF THE REVERSED STRING AS A NOTICE TO THE ROLLUP SERVER
   const notice_req = await fetch(rollup_server + "/notice", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: str2hex(reverseString) }),
   });
   return "accept";
}


async function handle_inspect(data) {
   console.log("Received inspect request data " + JSON.stringify(data));
   const payload = data["payload"];

   const query = hex2str(payload);
   let responseObject = {};

   if (query === "stats") {
      responseObject = JSON.stringify({
         totalCharacters,
         totalWords,
         longestString,
      });
   } else {
      responseObject = "Invalid query";
   }

   const report_req = await fetch(rollup_server + "/report", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: str2hex(responseObject) }),
   });

   return "accept";
}

var handlers = {
   advance_state: handle_advance,
   inspect_state: handle_inspect,
};

var finish = { status: "accept" };

(async () => {
   while (true) {
      const finish_req = await fetch(rollup_server + "/finish", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ status: "accept" }),
      });

      console.log("Received finish status " + finish_req.status);

      if (finish_req.status == 202) {
         console.log("No pending rollup request, trying again");
      } else {
         const rollup_req = await finish_req.json();
         var handler = handlers[rollup_req["request_type"]];
         finish["status"] = await handler(rollup_req["data"]);
      }
   }
})();
