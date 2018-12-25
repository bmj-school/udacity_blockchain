const boom = require('boom');
const RequestValidator = require('./RequestPool');
const blockchainlib = require('./simpleChain');
const Block = require('../models/Block')
const bitcoinMessage = require('bitcoinjs-message');
const hex2ascii = require('hex2ascii');
const Star = require('../models/Star');
const dbtools = require('../database/levelSandboxPromised');

requestPool = new RequestValidator.RequestPool()
blockchain = new blockchainlib.Blockchain()

var exported = {

    /**
     * 
     * @param {*} request 
     * @param {*} h 
     */
    POST_requestValidation: async function (request, h) {
        /*
        1   VALIDATION
        1.1 A user (address) submits a validation request. They pass their wallet address as data. 
        1.2 The server calls AddRequestValidation to append the validation request to the mempool
        1.3 The server returns a requestObject wtih the address, the timestamp of the request, 
            the message, and the validation windows (300 seconds)

        */
        console.log(`POST Validation requested: ${JSON.stringify(request.payload)}`);
        if (!request.payload.hasOwnProperty('address')) {
            return boom.badRequest('Missing payload key. Pass address as JSON.');
        }

        thisAddress = request.payload.address;
        if (thisAddress in requestPool.mempool) {
            return requestPool.mempool[thisAddress].respond()
        }
        response = requestPool.addRequest(thisAddress)
        return response;
    },

    /**
     * 
     * @param {*} request 
     * @param {*} h 
     */
    POST_messageSigValidate: async function (request, h) {
        console.log(`POST Signature provided, validate: ${JSON.stringify(request.payload)}`);
        if (!request.payload.hasOwnProperty('address')) {
            return boom.badRequest('Missing payload key. Pass address as JSON.');
        }
        if (!request.payload.hasOwnProperty('signature')) {
            return boom.badRequest('Missing payload key. Pass signature as JSON.');
        }

        address = request.payload.address;

        if (address in requestPool.mempool) {
            requestInstance = requestPool.mempool[thisAddress]
            requestObject = requestInstance.respond();

            let signature = request.payload.signature
            let message = requestObject.message

            let isValid = bitcoinMessage.verify(message, address, signature);

            if (isValid) {
                console.log('Valid signature.');
                // This will shift the wallet from pending to approved list
                requestPool.approveWallet(address);
                return requestPool.validRequests[address].respond();;
            } else {
                return boom.badRequest('Invalid signature.');
            }

        } else {
            return boom.badRequest('This address has not requested validation, or request has expired.');
        }
    },

    /**
     * 
     * @param {*} request 
     * @param {*} h 
     */
    // CRITERION: Star object and properties are stored within the body of the block.
    // CRITERION: Star properties include the coordinates with encoded story.
    // CRITERION: Star story supports ASCII text, limited to 250 words (500 bytes), and hex encoded.
    POST_block: async function (request, h) {
        console.log(`POST validation requested: ${JSON.stringify(request.payload)}`);

        // Error handling
        if (!request.payload.hasOwnProperty('address')) {
            return boom.badRequest('Missing payload key. Pass address as JSON.');
        }
        if (!request.payload.hasOwnProperty('star')) {
            return boom.badRequest('Missing payload key. Pass star as JSON.');
        }
        // if (!(request.payload.address in requestPool.validRequests)) {
        //     return boom.badRequest('Address not invited to register - validate and sign first!.');
        // }

        // The Star block data
        console.log('Payload \n' + request.payload);
        thisStar = new Star(request.payload);

        // Check if the star data is valid
        validReturn = thisStar.validate();

        if (!(validReturn === true)) {
            console.log(validReturn);
            return boom.badRequest('Error in star data: ' + validReturn);
        } else {
            // Add the star block to the chain
            try {
                let block = new Block(thisStar.asBlockBody());
                block = await blockchain.addBlock(block);
                block.body.star['storyDecoded'] = hex2ascii(block.body.star.story);
                return block;
            } catch (err) {
                console.log(err);
                return boom.badImplementation('Error ', err);
            }
        }
    },

    /**
     * GET_starByHash
     * @param {*} request 
     * @param {*} h 
     */
    GET_starByHash: async function (request, h) {
        console.log(`GET block by BLOCK_HASH: ${request.params.BLOCK_HASH}`);
        // TODO: This can be refactored to be cleaner! 
        result = await dbtools.getBlockByHash(request.params.BLOCK_HASH)
        resultJson = JSON.parse(result)
        resultJson.body.star['storyDecoded'] = hex2ascii(resultJson.body.star.story);
        return resultJson;
    },

    /**
     * GET_starByAddress
     * @param {*} request 
     * @param {*} h 
     */
    GET_starByAddress: async function (request, h) {
        console.log(`GET block by BLOCK_ADDRESS: ${request.params.BLOCK_ADDRESS}`);
        // TODO: This can be refactored to be cleaner! 


        
        

        results = await dbtools.getBlockByAddress(request.params.BLOCK_ADDRESS)
        decodedResults = [];
        for (index = 0; index < results.length; index++) { 
            let resultJson = JSON.parse(results[index]);
            resultJson.body.star['storyDecoded'] = hex2ascii(resultJson.body.star.story);
            decodedResults.push(resultJson);
        } 
        return decodedResults;
        },

    /**
     * 
     * @param {*} request 
     * @param {*} h 
     */
    GET_blockByHeight: async function (request, h) {
        console.log(`GET block by BLOCK_HEIGHT: ${request.params.BLOCK_HEIGHT}`);
        // TODO: This can be refactored to be cleaner! 
        thisHeight = request.params.BLOCK_HEIGHT;
        numBlocks = await dbtools.getNumElements();
        chainHeight = numBlocks-1;
        if (thisHeight > chainHeight) {
            return boom.badRequest(`Your request of blockheight ${thisHeight} is greater than chain height of ${chainHeight}`)
        }
        // console.log(request.params.BLOCK_HEIGHT, numBlocks);
        // console.log('TESTTTTT');
        result = await blockchain.getBlock(request.params.BLOCK_HEIGHT)
        // console.log(result);

        resultJson = result;
        if ('star' in resultJson) {
            resultJson.body.star['storyDecoded'] = hex2ascii(resultJson.body.star.story);
        }
        return resultJson;
    },
}
module.exports = exported