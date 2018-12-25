// Basic private blockchain 
// Block class - contains hash, height, data, time, prevhash
// Blockchain class - array of blocks

// These utility functions are loaded: 
//   dbtools.addLevelDBData (Promised version)
//   dbtools.getLevelDBData (Promised version)
//   dbtools.getNumElements (Promised version)

const SHA256 = require('crypto-js/sha256');
const dbtools = require('../database/levelSandboxPromised');
const Block = require('../models/Block')


/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain {
  constructor() {
    this.chain = [];

    this.getBlockHeight().then((height) => {
      // console.log(`Got height: ${height}`);
      if (height === 0) {
        this.addBlock(new Block("Genesis block")).then(() => console.log("Genesis block added!"))
      }
    })
  }

  /**
   * Retrieve persisted block height
   */
  async getBlockHeight() {
    return await dbtools.getNumElements();
  }

  /**
   * Add persisted block 
   * @param {*} newBlock 
   */
  async addBlock(newBlock) {

    // Block height
    const cur_height = await this.getBlockHeight()
    newBlock.height = cur_height //+ 1
    console.log('addBlock at height ' + newBlock.height);

    // UTC timestamp
    newBlock.time = new Date().getTime().toString().slice(0, -3);

    // previous block hash
    if (newBlock.height > 0) {
      const prevBlock = await this.getBlock(cur_height - 1)
      newBlock.previousBlockHash = prevBlock.hash
      console.log(`Previous hash: ${newBlock.previousBlockHash}`)
    }

    // Block hash with SHA256 using newBlock and converting to a string
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

    console.log('Complete new block: ' + JSON.stringify(newBlock));
    // Adding block object to chain
    await dbtools.addLevelDBData(newBlock.height, JSON.stringify(newBlock))
    return newBlock
  }

  /**
   * Get persisted block object
   * @param {*} height 
   */
  async getBlock(height) {
    // return object as a single string
    // return JSON.parse(JSON.stringify(this.chain[blockHeight]));
    return JSON.parse(await dbtools.getLevelDBData(height))
  }


  /**
   * Validate persisted block
   * @param {*} blockHeight 
   */
  async validateBlock(blockHeight) {
    // get block object
    let block = await this.getBlock(blockHeight);

    // get block hash
    let blockHash = block.hash;

    // remove block hash to test block integrity
    block.hash = '';

    // generate block hash
    let validBlockHash = SHA256(JSON.stringify(block)).toString();

    // Compare
    if (blockHash === validBlockHash) {
      return true;
    } else {
      console.log('Block #' + blockHeight + ' invalid hash:\n' + blockHash + '<>' + validBlockHash);
      return false;
    }
  }

  /**
   * Validate persisted blockchain
   */
  async validateChain() {
    let errorLog = [];
    let previousHash = ''
    let isValid = false
    const blockHeight = await this.getBlockHeight()
    for (var i = 0; i < blockHeight; i++) {
      console.log(`Checking block ${i} ...`);
      this.getBlock(i).then((block) => {
        this.validateBlock(block.height).then((isValid) => {
          if (!isValid) { errorLog.push(i) }
          if (block.previousBlockHash !== previousHash) { errorLog.push(i) }
          previousHash = block.hash
        })
      })
    }
    if (errorLog.length > 0) {
      console.log('Block errors = ' + errorLog.length);
      console.log('Blocks: ' + errorLog);
      return false;
    } else {
      console.log('No errors detected');
      return true;
    }
  }
}


// bc = new Blockchain;

// bc.getBlock(0).then(block => {
//   // console.log(block);
//   // console.log(block.hash);
//   bc.validateBlock(0).then(valid => {
//     console.log(`Block 1 is valid: ${valid}`);
//   })
//   bc.addBlock(new Block("My test block"))
//   bc.validateChain()
// })





// let blockchain = new Blockchain();

// (function theLoop(i) {
//   setTimeout(() => {
//     blockchain.addBlock(new Block(`Test data ${i}`)).then(() => {
//       if (--i) {
//         theLoop(i)
//       }
//     })
//   }, 100);
// })(10);

// setTimeout(() => blockchain.validateChain(), 2000)

module.exports.Blockchain = Blockchain
module.exports.Block = Block