var exported = {

    POST_requestValidation: async function RequestValidation_POST(request, h) {
        console.log(`POST validation requested: ${JSON.stringify(request.payload)}`);
        if (!request.payload.hasOwnProperty('address')) {
            return boom.badRequest('Missing payload key. Pass address as JSON.');
        }
        return 'POST_requestValidation';
    },

    POST_messageSigValidate: async function POST_messageSigValidate(request, h) {
        console.log(`POST validation requested: ${JSON.stringify(request.payload)}`);
        if (!request.payload.hasOwnProperty('address')) {
            return boom.badRequest('Missing payload key. Pass address as JSON.');
        }
        if (!request.payload.hasOwnProperty('signature')) {
            return boom.badRequest('Missing payload key. Pass signature as JSON.');
        }
        
        return 'POST_messageSigValidate';
    },

    POST_block: async function POST_block(request, h) {
        console.log(`POST validation requested: ${JSON.stringify(request.payload)}`);
        if (!request.payload.hasOwnProperty('address')) {
            return boom.badRequest('Missing payload key. Pass address as JSON.');
        }
        if (!request.payload.hasOwnProperty('star')) {
            return boom.badRequest('Missing payload key. Pass star as JSON.');
        }
        return 'POST_block';
    },

    GET_starByHash: async function GET_starByHash(request, h) {
        console.log(`GET block by BLOCK_HASH: ${request.params.BLOCK_HASH}`);
        return 'GET_starByHash';
    },

    GET_starByAddress: async function GET_starByAddress(request, h) {
        console.log(`GET block by BLOCK_ADDRESS: ${request.params.BLOCK_ADDRESS}`);
        return 'GET_starByAddress';
    },

    GET_blockByHeight: async function GET_blockByHeight(request, h) {
        console.log(`GET block by BLOCK_HEIGHT: ${request.params.BLOCK_HEIGHT}`);
        return 'GET_blockByHeight';
    },

}
module.exports = exported