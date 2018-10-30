/* ===== SHA256 with Crypto-js ===================================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js      |
|  =============================================================*/

const SHA256 = require('crypto-js/sha256');

// -----------------------SPECIFICATION 1) Configure levelDB to persist dataset
let level = require('level');
let chainDB = './simplechaindata5';
let db = level(chainDB);


/* ===== Level DB Utilities ============================
|  LevelDB utilities                                   |
|  ====================================================*/

// Add data to levelDB with key/value pair
function addLevelDBData(key, value) {
    db.put(key, value, function (err) {
        if (err) return console.log('Block ' + key + ' submission failed', err);
    })
}

// Get data from levelDB with key
function getLevelDBData(key) {
    db.get(key, function (err, value) {
        if (err) return console.log('Not found!', err);
        console.log('Value = ' + value);
    })
}

// Add data to levelDB with value
function addDataToLevelDB(value) {
    let i = 0;
    db.createReadStream().on('data', function (data) {
        i++;
    }).on('error', function (err) {
        return console.log('Unable to read data stream!', err)
    }).on('close', function () {
        console.log('addData.on readstream close; Block #' + i);
        addLevelDBData(i, value);
    });
}


/* ===== Block Class ===================================
|  Class with a constructor for block data model       |
|  ====================================================*/

class Block {
    constructor(data) {
        this.height = '';
        this.timeStamp = '';
        this.data = data;
        this.previousHash = '0x';
        this.hash = '';
        console.log('Created new block with data: ' + data);

    }
}

/* ===== Blockchain ===================================
|  Class with a constructor for blockchain data model  |
|  with functions to support:                          |
|     - createGenesisBlock()                           |
|     - getLatestBlock()                               |
|     - addBlock()                                     |
|     - getBlock()                                     |
|     - validateBlock()                                |
|     - validateChain()                                |
|  ====================================================*/

class Blockchain {
    constructor() {
        // new chain array
        this.chain = [];
        // add first genesis block
        // this.addBlock(this.createGenesisBlock());
    }

    createGenesisBlock() {
        let genesisBlk = new Block("First block in the chain - Genesis block");
        genesisBlk.height = 0
        return genesisBlk;
    }

    // General method to add blocks 
    addBlock(thisBlock) {
        console.log('Adding block at height: ' + thisBlock.height)
        let rawBlockText = JSON.stringify(thisBlock);

        thisBlock.timeStamp = new Date().getTime().toString().slice(0, -3);
        if (this.chain.length > 0) {
            // previous block hash
            thisBlock.previousHash = this.chain[this.chain.length - 1].hash;
        }
        // SHA256 requires a string of data
        thisBlock.hash = SHA256(JSON.stringify(thisBlock)).toString();

        // add block to chain

        console.log('Ready to add raw block:' + rawBlockText);
        this.chain.push(thisBlock);

        // -----------------------SPECIFICATION 2) Modify to persist in LDB
        console.log('Adding block ' + thisBlock.height + ' to DB');
        addLevelDBData(thisBlock.height, rawBlockText)


    }
    // addNewBlock method 
    addNewBlock(newBlock) {
        // Check if the chain is empty
        if (Array.isArray(this.chain) && this.chain.length) {
            // array exists and is not empty
            newBlock.height = this.chain.length;
        } else {
            // array does not exist, create the genesis block first
            console.log('Need to create genesis block!');
            let genesisBlock = this.createGenesisBlock()
            genesisBlock.height = 0
            this.addBlock(genesisBlock)

            // And now add the block
            newBlock.height = this.chain.length;
            this.addBlock(newBlock)
        }
    }

    getAllBlocks(readStream) {
        return new Promise((resolve, reject) => {
            let blocks = []
            readStream.on('data', function (data) {
                let blockText = data.value
                let block_obj = JSON.parse(blockText)
                blocks.push(block_obj)
            }).on('end', () => resolve(blocks))
        })
    }

    loadBlocks() {
        var readStream = db.createReadStream();

        this.getAllBlocks(readStream).then(function (data) {
            console.log(data);
            console.log('Finished');
        });
    }

}

// TEST 1
let sample_block = new Block('Hi')
console.log("This is a block: " + sample_block.data);

addLevelDBData(0,sample_block)