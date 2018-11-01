/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');
const dbtools = require('./levelSandboxPromised')

console.log(`Level DB tools module loaded`);
// These utility functions are loaded: 
dbtools.addLevelDBData; // Promised version
dbtools.getLevelDBData; // Promised version
dbtools.getNumElements; // Promised version


/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class Block{
	constructor(data){
     this.hash = "",
     this.height = 0,
     this.body = data,
     this.time = 0,
     this.previousBlockHash = ""
    }
}

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain{
  constructor(){
    this.chain = [];

    // console.log(`num_blocks = ${}`);

    // this.numBlocks().then(num_blocks=> console.log(`${num_blocks}`)); 

    // if ((response => console.log(response);
    // ) == 20) {
    //   console.log('20')

    // } else {
    //   console.log('NOT 20');
    // }j
    this.getBlockHeight().then((height) => {
      console.log(`Got height: ${height}`);
      
      if (height === 0) {
        this.addBlock(new Block("Genesis block")).then(() => console.log("Genesis block added!"))
      }
    })
    
    // this.addBlock(new Block("First block in the chain - Genesis block"));
  }

  // Add new block
  addBlock(newBlock){
    // Block height
    // newBlock.height = this.chain.length;
    const cur_height = await this.getBlockHeight()
    newBlock.height = cur_height + 1

    // UTC timestamp
    newBlock.time = new Date().getTime().toString().slice(0,-3);

    // previous block hash
    if(this.chain.length>0){
      newBlock.previousBlockHash = this.chain[this.chain.length-1].hash;
    }

    // Block hash with SHA256 using newBlock and converting to a string
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    // Adding block object to chain
  	this.chain.push(newBlock);
  }

  // CRITERIA - Retrieve persisted block height
  // Get block height
  async getBlockHeight() {
    // return this.chain.length-1;
    return await dbtools.getNumElements();

  }

    // get block
    getBlock(blockHeight){
      // return object as a single string
      return JSON.parse(JSON.stringify(this.chain[blockHeight]));
    }

    // validate block
    validateBlock(blockHeight){
      // get block object
      let block = this.getBlock(blockHeight);
      // get block hash
      let blockHash = block.hash;
      // remove block hash to test block integrity
      block.hash = '';
      // generate block hash
      let validBlockHash = SHA256(JSON.stringify(block)).toString();
      // Compare
      if (blockHash===validBlockHash) {
          return true;
        } else {
          console.log('Block #'+blockHeight+' invalid hash:\n'+blockHash+'<>'+validBlockHash);
          return false;
        }
    }

   // Validate blockchain
    validateChain(){
      let errorLog = [];
      for (var i = 0; i < this.chain.length-1; i++) {
        // validate block
        if (!this.validateBlock(i))errorLog.push(i);
        // compare blocks hash link
        let blockHash = this.chain[i].hash;
        let previousHash = this.chain[i+1].previousBlockHash;
        if (blockHash!==previousHash) {
          errorLog.push(i);
        }
      }
      if (errorLog.length>0) {
        console.log('Block errors = ' + errorLog.length);
        console.log('Blocks: '+errorLog);
      } else {
        console.log('No errors detected');
      }
    }
}


bc = new Blockchain;