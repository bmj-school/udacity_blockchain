

## Versions 

- node version number : v11.6.0
- Truffle version number : v4.1.15 (core: 4.1.15)
  - Extra library, truffle-assertions : v0.8.0
- solidity compiler : v0.4.25 (solc-js)
- web3 version number : 

## Contracts

SupplyChain : https://rinkeby.etherscan.io/address/0xd885beb5b9d5233ff8991ca8a9b4418d535c6978

FarmerRole : https://rinkeby.etherscan.io/address/0xd46231152721926f981270947dd035aaaf5d2c0e

DistributorRole : https://rinkeby.etherscan.io/address/0x2d0a49f9d7c6101cc33d28457d12739cca91d98c

RetailerRole : https://rinkeby.etherscan.io/address/0xe5412b84ffa2f856054800bf46359ee9369a8b64

ConsumerRole : https://rinkeby.etherscan.io/address/0xdeaf5b241d65e5b1739642657500cf94c3e458c6

# Part 1 - write-ups



## 1) Project write-up - UML

(Same as boilerplate)

## 2) Project write-up - Libraries

One additional library used for testing, see relevant section. 

## 3) Project write-up - IPFS

Not used. 

# Part 2 - smart contracts

See `./project/contracts`

### Roles

- ***Administrator/Owner**: The deployer of the contracts, (owner). Has admin access to all roles (add/remove). (Useful for testing deployed dApp.). Added extra registration methods on SupplyChain.sol. 
- **Farmer**: As in boilerplate code. 
- **Distributor**: As in boilerplate code. 
- **Retailer**: As in boilerplate code. 
- **Consumer**: As in boilerplate code. 

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
3. Change the endpoint to Rinkeby 
4. URL of the endpoint for Rinkeby: https://rinkeby.infura.io/v3/8e82a9e891cd4f76ace92546b57f7278 
5. Settings `truffle.js`

```
require('babel-register')

const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = "8e82a9e891cd4f76ace92546b57f7278";
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

rinkeby: {
  provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/${infuraKey}`),
  network_id: 4,       // Ropsten's id
  gas: 5500000,        // Ropsten has a lower block limit than mainnet
  confirmations: 2,    // # of confs to wait between deployments. (default: 0)
  timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
  skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
},
```
6. Store mnemonic in .secret and gitignore
7. Confirm the deployment scripts in `/migrations`
8. Fund the Rinkeby account
9. `truffle compile`
10. `truffle migrate --network rinkeby`

Result: 



```
Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0xa3176b6269ac83d88b666187d0c0d90b82604805765874a14e797b12961e9a1d
  Migrations: 0xf1f53bf8d25c65d5675e8ce26a1e7113f95588f7
Saving successful migration to network...
  ... 0xd08407b795f53cacc03e8e11a5b5e0a46921fab0a4eeda294d16bdf1ffc19cba
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying FarmerRole...
  ... 0x2d8aa9a6a2a1a99e04ef48023abcf2c4ac2f28784b6ec7b75137203298bbb417
  FarmerRole: 0xd46231152721926f981270947dd035aaaf5d2c0e
  Deploying DistributorRole...
  ... 0x704ee8770e898027082742a07ee12ad3b42d95452f786bc0997c9929e9bcfadf
  DistributorRole: 0x2d0a49f9d7c6101cc33d28457d12739cca91d98c
  Deploying RetailerRole...
  ... 0x34e28fcfea7fe2c270d97dbd1fb5bd13d33e4c4658b646786902fe147c0deb4e
  RetailerRole: 0xe5412b84ffa2f856054800bf46359ee9369a8b64
  Deploying ConsumerRole...
  ... 0x24046b8e2ebbce19c3b5bc49d4039242bce04527c7cd6d23605e59877d59fefa
  ConsumerRole: 0xdeaf5b241d65e5b1739642657500cf94c3e458c6
  Deploying SupplyChain...
  ... 0x158605379d233168f4abe6b990b58eb30f52ad5c77212eb31e5ca8259e353188
  SupplyChain: 0xd885beb5b9d5233ff8991ca8a9b4418d535c6978
Saving successful migration to network...
  ... 0x26a0b6af24c8e829a4c465fbee53afdd0f28486751cdc8c167a0127ec3b415e9
Saving artifacts...
```



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
