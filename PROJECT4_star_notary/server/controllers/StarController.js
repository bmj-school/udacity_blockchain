
const RequestValidator = require('./RequestValidator');
requestPool = new RequestValidator.RequestPool()

const bitcoinMessage = require('bitcoinjs-message'); 

var exported = {

    POST_requestValidation: async function (request, h) {
        /*
        1   VALIDATION
        1.1 A user (address) submits a validation request. They pass their wallet address as data. 
        1.2 The server calls AddRequestValidation to append the validation request to the mempool
        1.3 The server returns a requestObject wtih the address, the timestamp of the request, 
            the message, and the validation windows (300 seconds)

        */
        console.log(`POST validation requested: ${JSON.stringify(request.payload)}`);
        if (!request.payload.hasOwnProperty('address')) {
            return boom.badRequest('Missing payload key. Pass address as JSON.');
        }
        
        thisAddress =request.payload.address;
        if (thisAddress in requestPool.mempool){
            return requestPool.mempool[thisAddress].respond()
        }
        response = requestPool.addRequest(thisAddress)
        return response;
    },

    POST_messageSigValidate: async function (request, h) {
        console.log(`POST validation requested: ${JSON.stringify(request.payload)}`);
        if (!request.payload.hasOwnProperty('address')) {
            return boom.badRequest('Missing payload key. Pass address as JSON.');
        }
        if (!request.payload.hasOwnProperty('signature')) {
            return boom.badRequest('Missing payload key. Pass signature as JSON.');
        }


        if (thisAddress in requestPool.mempool){
            return requestPool.mempool[thisAddress].respond();
            let address = request.payload.address
            
            let signature = request.payload.signature

            let message = requestPool.mempool[thisAddress].respond().message

            
            let isValid = bitcoinMessage.verify(message, address, signature);

            console.log('');
            
            return 'POST_messageSigValidate';            
        } else {
            return boom.badRequest('This address has not requested validation.'); 
        }
    },

    POST_block: async function (request, h) {
        console.log(`POST validation requested: ${JSON.stringify(request.payload)}`);
        if (!request.payload.hasOwnProperty('address')) {
            return boom.badRequest('Missing payload key. Pass address as JSON.');
        }
        if (!request.payload.hasOwnProperty('star')) {
            return boom.badRequest('Missing payload key. Pass star as JSON.');
        }
        return 'POST_block';
    },

    GET_starByHash: async function (request, h) {
        console.log(`GET block by BLOCK_HASH: ${request.params.BLOCK_HASH}`);
        return 'GET_starByHash';
    },

    GET_starByAddress: async function (request, h) {
        console.log(`GET block by BLOCK_ADDRESS: ${request.params.BLOCK_ADDRESS}`);
        return 'GET_starByAddress';
    },

    GET_blockByHeight: async function (request, h) {
        console.log(`GET block by BLOCK_HEIGHT: ${request.params.BLOCK_HEIGHT}`);
        return 'GET_blockByHeight';
    },

}
module.exports = exported