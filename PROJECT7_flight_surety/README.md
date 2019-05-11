# Flight Surety project - overview


## Architecture
The data persistence smart contracts have been refactored; 
- `AirlineData` for the Airlines (voting, status, etc.)
- `FlightData` for the flights and passengers

The testing suite reflects this, with unit testing on each contract seperated. 

## Governance
    /* AIRLINES
    Each airline is represented by their public address
    Airlines have various status codes to represent their state in the contract.
    */
    enum RegistrationState
    {
        Proposed,  // 0
        Registered // 1
    }

# Smart contract development
## Notes
NB: Do not use HDWalletProvider! Major errors with multiple deployments, very slow with Ganache, etc.

Follow up - Constructor can't call a function?

## Ganache testing
Start ganache with the same seed phrase as specified in truffle configuration `truffle.js`.

`ganache-cli -p 8545 --gasLimit 10000000 -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"`

## Faster testing
Run `truffle develop` to start the development blockchain (not ganache)

At the develop console, run `test` to run all tests, or `test ./test/testscript.js` to run a single test.

# Server development
The server simulates the oracle information.

# Front end development

```
"test": "truffle test ./test/flightSurety.js",
"dapp": "webpack-dev-server --mode development --config webpack.config.dapp.js",
"dapp:prod": "webpack --mode production  --config webpack.config.dapp.js",
"server": "rm -rf ./build/server && webpack --config webpack.config.server.js"
```



# FlightSurety (Boilerplate code section)

FlightSurety is a sample application project for Udacity's Blockchain course.

## Install
This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle), dApp scaffolding (using HTML, CSS and JS) and server app scaffolding.

To install, download or clone the repo, then:

`npm install`

`truffle compile`

## Develop Client

To run truffle tests:

`truffle test ./test/flightSurety.js`

`truffle test ./test/oracles.js`

To use the dapp:

`truffle migrate`

`npm run dapp`

To view dapp:

`http://localhost:8000`

## Develop Server

`npm run server`

`truffle test ./test/oracles.js`

## Deploy

To build dapp for prod:
`npm run dapp:prod`

Deploy the contents of the ./dapp folder


## Resources

* [How does Ethereum work anyway?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)
* [BIP39 Mnemonic Generator](https://iancoleman.io/bip39/)
* [Truffle Framework](http://truffleframework.com/)
* [Ganache Local Blockchain](http://truffleframework.com/ganache/)
* [Remix Solidity IDE](https://remix.ethereum.org/)
* [Solidity Language Reference](http://solidity.readthedocs.io/en/v0.4.24/)
* [Ethereum Blockchain Explorer](https://etherscan.io/)
* [Web3Js Reference](https://github.com/ethereum/wiki/wiki/JavaScript-API)