const SHA256 = require('crypto-js/sha256');
const blockchain = require('./simpleChain');
console.log(`Blockchain module loaded`);
const boom = require('boom');

// console.log('Blockchain = ' + typeof blockchain.Blockchain);
// bc = new blockchain.Blockchain
// console.log(bc);

/**
 * Controller Definition to encapsulate routes to work with blocks
 */

class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} server 
     */
    constructor(server) {
        this.server = server;
        this.blockchain = new blockchain.Blockchain()
        // this.blocks = [];
        // this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
        this.getBlockHeight();
    }
    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.server.route({
            method: 'GET',
            path: '/api/block/{index}',
            handler: async (request, h) => {
                var idx = encodeURIComponent(request.params.index)
                console.log('GET /block/' + idx);
                var idx_num = Number(idx);
                if (!Number.isInteger(idx_num)) {
                    return boom.badRequest('Invalid query, non-integer index was passed: '+idx)
                }
                var height = await this.blockchain.getBlockHeight();
                if (idx_num >= height){
                    console.log(idx_num, '>=', height);
                    return boom.badRequest('Invalid query, the greatest block index (zero-indexed!) is: ' + (height-1));
                } 
                var block = await this.blockchain.getBlock(idx);
                return block 
            }
        });
    }

    getBlockHeight() {
        this.server.route({
            method: 'GET',
            path: '/api/blockheight',
            handler: async (request, h) => {
                console.log('GET /blockheight');
                return await this.blockchain.getBlockHeight()
            }

        })
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     * Uses x-www-form-urlencoded POST
     */
    postNewBlock() {
        this.server.route({
            method: 'POST',
            path: '/api/block',
            handler: async (request, h) => {
                // var body = JSON.parse(JSON.stringify(request.body));


                /*********** TODO: This doesn't work! How to assert body?
                // ERROR: No data key
                if (request.body && Object.prototype.hasOwnProperty.call(request.body, 'data')) {
                    return boom.badRequest('API requires a \'data\' key-value pair in x-www-form-urlencoded');
                }
                // if (!body.hasOwnProperty('data')) {
                //     return boom.badRequest('API requires a \'data\' key-value pair in x-www-form-urlencoded');
                // }
                if (!request.payload.hasOwnProperty('data')){
                    console.log('Missing data field');
                }
                ****************/
                console.log();
                
                try {
                    var data = request.payload.data;
                    console.log('POST /block data=' + data);
                    var block = new blockchain.Block(data);
                    console.log(block);
                    
                    block = await this.blockchain.addBlock(block);
                    return h.response(block).code(201);
                } catch (err)  {
                    console.log(err);
                    return boom.badImplementation('Error ', err);
                }
            }
        });
    }


    validateChain() {
        this.server.route({
            method: 'GET',
            path: '/api/validate',
            handler: async (request, h) => {
                console.log('GET /api/validate');
                valid = await this.blockchain.validateChain();
                console.log(valid);
                return h.response(valid).code(200)
                
            }
        })
    }
    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData() {
        if(this.blocks.length === 0){
            console.log('No blocks found - creating mock data');
            
            for (let index = 0; index < 10; index++) {
                let blockAux = new BlockClass.Block(`Test Data #${index}`);
                blockAux.height = index;
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                this.blocks.push(blockAux);
            }
        }
    }


}

/**
 * Exporting the BlockController class
 * @param {*} server 
 */
module.exports = (server) => { return new BlockController(server);}
