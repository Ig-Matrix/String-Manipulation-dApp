<a id="readme-top"></a>
<br />
<div align="center">
  <a href="https://github.com/Ig-Matrix/String-Manipulation-dApp.git">
  </a>

  <h3 align="center">String Manipulation dApp</h3>

  <p align="center">
    The String Manipulation dApp documentation.
  </p>
</div>

## About
<p>
    This decentralized application (dApp) is powered by <a href="https://docs.cartesi.io/cartesi-rollups/1.3/">Cartesi</a> Rollups technology.
</p>
<p> 
    The dApp allows users to submit strings for text manipulation (e.g., reversing text) while tracking various statistics such as the total number of characters processed, total words, and the longest string received. The benefits of using blockchain technology, such as data integrity, decentralization, and security, are integrated into the system.
</p>

## Getting Started

Below you'll find instructions on how to set up this dApp locally.

### Prerequisites

Make sure you have the following packages installed on your machine:

* [Node.js](https://nodejs.org/en), [npm](https://docs.npmjs.com/cli/v10/configuring-npm/install), [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) 

* [Docker](https://docs.docker.com/get-docker/)

* [Cartesi CLI](https://docs.cartesi.io/cartesi-rollups/1.3/development/migration/#install-cartesi-cli)
  ```sh
  npm install -g @cartesi/cli

### Installation

1. Clone this repo
   ```sh
   git clone git@github.com:Ig-Matrix/String-Manipulation-dApp.git
   ```
2. Install NPM packages
   ```sh
   yarn  install
   ```
3. Build and run the dapp via `cartesi-cli`
   ```sh
   cartesi build 
   ```
   and
   ```sh
   cartesi run 
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Here you can find examples of how to interact with the dApp, including string manipulation and inspecting the tracked statistics.
### Advanced Handlers

  ####  reverseString

    ```js

  description — submit a string to be reversed.
  param data — {text: string}
   ```

data sample

  ```json

  {
      "action":"reverseString", 
      "data":{
          "text":"hello world"
      }
  } 
  ```
hex sample
```
0x7b22616374696f6e223a2272657665727365537472696e67222c202264617461223a7b2274657874223a2268656c6c6f20776f726c64227d7d
```
interact

  -  *via `cartesi cli`*, access your terminal in another window and input these instructions below:

```sh

cartesi send generic \
    --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
    --chain-id=31337 \
    --rpc-url=http://127.0.0.1:8545 \
    --mnemonic-passphrase='test test test test test test test test test test test junk' \
    --input=0x7b22616374696f6e223a2272657665727365537472696e67222c202264617461223a7b2274657874223a2268656c6c6f20776f726c64227d7d

  - *via `cast`*, access your terminal in another window and input this single line instruction below:
```

```sh

    cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e 0x7b22616374696f6e223a2272657665727365537472696e67222c202264617461223a7b2274657874223a2268656c6c6f20776f726c64227d7d --mnemonic 'test test test test test test test test test test test junk'
```

### Inspect Handlers

  ####  getStatistics

   ``` js
  description — retrieve current statistics for processed text.
```
returned hex sample

```json

  {
      "status": "Accepted",
      "exception_payload": null,
      "reports": [
          {
              "payload": "0x..."
          }
      ],
      "processed_input_count": 2
  }
```
converted payload sample

```json

  {
      "totalCharacters": 32,
      "totalWords": 6,
      "longestString": "hello world"
  }
```
  interact
  -  access the Cartesi inspect endpoint on your browser
  
```sh
    http://localhost:8080/inspect/getStatistics
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

We welcome contributions from the community! If you'd like to contribute to this dApp, please follow these steps:

  - Fork the repository.
  - Create a new branch for your feature or bug fix.
  - Make your changes and commit them with descriptive commit messages.
  - Push your changes to your forked repository.
  - Submit a pull request to the main repository.
  - Please ensure that your code adheres to the project's coding standards and includes appropriate tests.

License

This dApp is released under the [MIT](./LICENSE) License.
Acknowledgments

This dApp is built on top of the Cartesi platform and utilizes various open-source libraries and tools. We would like to express our gratitude to the developers and contributors of these projects.
<p align="right">(<a href="#readme-top">back to top</a>)</p>
