

- node version number : v11.6.0
- Truffle version number : 4.1.15
  - Extra library, truffle-assertions : v0.8.0
- solidity pragma : 0.4.24
- web3 version number : 

# Part 1 - write-ups



## 1) Project write-up - UML

## 2) Project write-up - Libraries

## 3) Project write-up - IPFS

# Part 2 - smart contracts

See `./project/contracts`

### Roles

- **Administrator**: The deployer of the contracts, (owner). The **Administrator** has access to all roles. (Useful for testing deployed dApp.). Added extra registration methods on SupplyChain.sol. 
- **Farmer**: 
- **Distributor**: 
- **Retailer**: 
- **Consumer**: 

# Part 3 - Test coverage

## Truffle testing

See `./project/tests`

Ensure all packages are installed `npm install`

Run `truffle test`. 

## Extra testing features

Uses [truffle-assertions](https://www.npmjs.com/package/truffle-assertions) package for clean assertion of `revert` and `eventEmitted`.

Uses `beforeEach` to setup each test. Ensures contract is deployed, and if actors are not registered, to register the test accounts. 

Proper roles enforced by testing with incorrect roles, and asserting revert.

Proper balances enforced after purchase in both underpaying, and overpaying case.

## User Guide: Local testing, including front-end

### Start Blockchain 

Start Ganache CLI on `localhost:8545`

Compile contracts `truffle compile`

Verify that `truffle.js` is configured to use the running Ganache. 

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
```

Migrate with `truffle migrate`.

### Start dApp

Start the web UI and browser sync with `npm run dev`

### Connect metamask

Login to metamask. 

Configure and select the `localhost:8545` network. 

Verify owner account is imported. 

Import other accounts (roles) with private keys. 

# Part 4 - Deployment to test net

1. Login to Infura
2. Create new project - Coffee Supply Chain

# Part 5 - Modify client code to interact with smart contract

# Part 6 - Optional: Implement Infura to store product image



# Unit testing strategy



# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

The DApp User Interface when running should look like...

![truffle test](images/ftc_product_overview.png)

![truffle test](images/ftc_farm_details.png)

![truffle test](images/ftc_product_details.png)

![truffle test](images/ftc_transaction_history.png)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

```
Give examples (to be clarified)
```

### Installing

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/udacity/nd1309/tree/master/course-5/project-6
```

Change directory to ```project-6``` folder and install all requisite npm packages (as listed in ```package.json```):

```
cd project-6
npm install
```

Launch Ganache:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

Your terminal should look something like this:

![truffle test](images/ganache-cli.png)

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

Your terminal should look something like this:

![truffle test](images/truffle_compile.png)

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Your terminal should look something like this:

![truffle test](images/truffle_migrate.png)

Test smart contracts:

```
truffle test
```

All 10 tests should pass.

![truffle test](images/truffle_test.png)

In a separate terminal window, launch the DApp:

```
npm run dev
```

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
to make the web faster, safer, and more open.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.


## Authors

See also the list of [contributors](https://github.com/your/project/contributors.md) who participated in this project.

## Acknowledgments

* Solidity
* Ganache-cli
* Truffle
* IPFS
