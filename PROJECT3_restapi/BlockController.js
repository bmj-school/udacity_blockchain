const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');

const blockchain = require('./simpleChain');
console.log(`Blockchain module loaded`);
console.log('Blockchain = ' + typeof blockchain.Blockchain);
// bc = new blockchain.blockchain
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
        this.blocks = [];
        this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
        this.helloGet();
        this.helloPost();
        this.helloPostUser();
    }

    helloGet(){
        // Test route
        this.server.route({
            method:'GET',
            path:'/api/hello',
            handler:function(request,h) {
                console.log(request.payload);
                return'hello world';
            }
        });
    }
    helloGet2(){
        // Test route
        this.server.route({
            method:'GET',
            path:'/api/hellox',
            handler:function(request,h) {
                console.log(request.payload);
                return'hello world2';
            }
        });
    }
    helloPost(){
        // Test route
        this.server.route({
            method:'POST',
            path:'/api/hello',
            handler:function(request,h) {
                // console.log(request.payload);
                console.log(JSON.stringify(request.payload));
                
                return'hello world';
            }
        });
    }

    testGetParam(){
        this.server.route({
            method: 'GET',
            path: '/get/{name}',
            handler: (request, h) => {
        
                return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
            }
        });
    }
    testGetParam2(){
        this.server.route({
            method: 'GET',
            path: '/get/one',
            handler: (request, h) => {
        
                return 'Hello, one';
            }
        });
    }


    helloPostUser(){
        // Test route
        this.server.route({
            method:'GET',
            path:'/api/greet/{user}', 
            handler:function(request,h) {
                            // console.log(request.payload);
                // console.log(JSON.stringify(request.payload));
                console.log('greet/user');
                
                var usr = encodeURIComponent(request.params.user)
                return `hello ${usr}`;
            }
        });
    }

    helloPostIndex(){
        // Test route
        this.server.route({
            method:'GET',
            path:'/api/number/{index}',
            handler:function(request,h) {
                // console.log(request.payload);
                // console.log(JSON.stringify(request.payload));
                var idx = encodeURIComponent(request.params.index)
                return `hello ${idx}`;
            }
        });
    }
    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.server.route({
            method: 'GET',
            path: '/api/block/{index}',
            handler: (request, h) => {
               
            }
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        this.server.route({
            method: 'POST',
            path: '/api/block',
            handler: (request, h) => {
                
            }
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData() {
        if(this.blocks.length === 0){
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