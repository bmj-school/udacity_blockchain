# Project Deliverables summary

## Write Up

1. Student includes a README to explain how to test thier code.
    - [x] Present file
1. Student provides Contract Addresses, Contract Abi's, OpenSea MarketPlace Storefront link's.
    - [x] Contract addresses
    - [x] Contract ABI's
    - [x] MarketPlace link

## ERC721

1. ERC721 Mintable Contract - Student completes the boilerplate ERC721 Mintable Contract in ERC721Mintable.sol
    - [x] [ERC721Mintable.sol](eth-contracts/contracts/ERC721Mintable.sol)
1. ERC721 Mintable Contract Test Cases - Student writes and passes the test cases in TestERC721Mintable.js
    - [x] [TestERC721Mintable.sol](eth-contracts/test/TestERC721Mintable.sol)
1. ERC721 Mintable Contract Zokrates Test - Student writes and passes the test cases in 'TestSquareVerifier.js'
    - [x] [TestSquareVerifier.sol](eth-contracts/test/TestSquareVerifier.sol)
1. ERC721 Mintable Contract Zokrates Test Cases - Student writes and passes the test cases in TestSolnSquareVerifier.js
    - [x] [TestSquareVerifier.sol](eth-contracts/test/TestSquareVerifier.sol)

### Testing

See `./eth-contracts/test` for test files. 

Ensure all packages are installed `npm install`

Review `truffle-config.js` for configuration details. 

Run `truffle test` from the `truffle develop` console, or compile and migrate to ganache. 

## Extra testing features

Uses `beforeEach` to setup each test. Ensures contract is deployed, and if actors are not registered, to register the test accounts. 

Proper roles enforced by testing with incorrect roles, and asserting revert.

Proper balances enforced after purchase in both underpaying, and overpaying case.

Test results: 
```
  Contract: TestERC721Mintable
    match erc721 spec
      ✓ should return total supply
      ✓ should get token balance
      ✓ should return token uri
      ✓ should transfer token from one owner to another (104ms)
    have ownership properties
      ✓ should fail when minting when address is not contract owner
      ✓ should return contract owner

  Contract: SolnSquareVerifier
    ✓ Test if an ERC721 token can be minted for contract (2205ms)
    ✓ A repeated solution cannot be added (4256ms)

  Contract: SquareVerifier
    ✓  Test verification with correct proof (2151ms)
    ✓  Test verification with incorrect proof (372ms)
```

## Zokrates

1. Zokrates program written using DSL - Student completes the Zokrates proof in square.code by adding the variable names in square.code
    - [x] [square.code](zokrates/code/square/square.code)
1. Zokrates Test Cases - Student completes test contract in SolnSquareVerifier.sol
    - [x] [SolnSquareVerifier.sol](eth-contracts/contracts/SolnSquareVerifier.sol)
1. Zokrates Test Cases - Student writes and passes the test cases in 'TestSolnSquareVerifier.js'
    - [x] [TestSquareVerifier.sol](eth-contracts/contracts/TestSquareVerifier.sol)

## OpenSea Marketplace

1. Market Place - Student list ERC721/ ZoKrates tokens & complete transactions on market place

Tokens successfully minted: See https://rinkeby.etherscan.io/address/0x1f9c7e91a9b2e37af178ce96d5c3953b88aa185a

Marketplace tokens: [https://rinkeby.opensea.io/assets/unidentifiedcontractv43](https://rinkeby.opensea.io/assets/unidentifiedcontractv43)

Successful sale of an asset: https://rinkeby.opensea.io/assets/0x1f9c7e91a9b2e37af178ce96d5c3953b88aa185a/5

## Deployment

[Verifier: 0x7f9c148E48570713DC3AfCb33AB602f7F3d12837](https://rinkeby.etherscan.io/address/0x7f9c148e48570713dc3afcb33ab602f7f3d12837)

[SolnSquareVerifier: 0x1F9c7e91a9B2e37AF178Ce96d5c3953B88aA185a](https://rinkeby.etherscan.io/address/0x1f9c7e91a9b2e37af178ce96d5c3953b88aa185a)


1. Deployment - Student deploys ERC721 contracts with Zokrates integration.
    - [x] 
    1. Infura project: `Udacity Capstone Real Estate` at rinkeby.infura.io/v3/7e836c9010444e6a8861c57184350426
    1. Deploy:
    ```
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
      network_id: 4,
      gas: 6700000,
      gasPrice: 10000000000,
    }
    ```
    1. Store mnemonic in .secret and gitignore
    1. Confirm the deployment scripts in `/migrations`
    1. Fund the Rinkeby account
    1. `truffle compile`
    1. ENSURE correct infura URL (otherwise, will fail silently) `"https://rinkeby.infura.io/v3/7e836c9010444e6a8861c57184350426"`
    1. `truffle migrate --network rinkeby --reset --compile-all --verbose-rpc`


---

# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
