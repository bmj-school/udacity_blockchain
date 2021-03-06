// Allows us to use ES6 in our migrations and tests.
require('babel-register')

// Edit truffle.config file should have settings to deploy the contract to the Rinkeby Public Network.
// Infura should be used in the truffle.config file for deployment to Rinkeby.

const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = "8e82a9e891cd4f76ace92546b57f7278";
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();


module.exports = {
  networks: {
    
    // development: {
    //   host: "127.0.0.1",     // Localhost (default: none)
    //   port: 9545,            // Standard Ethereum port (default: none)
    //   network_id: "*",       // Any network (default: none)
    //  },

    // rinkeby: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/${infuraKey}`),
    //   network_id: 4,       // Ropsten's id
    //   gas: 5500000,        // Ropsten has a lower block limit than mainnet
    //   confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    }
  }
}
