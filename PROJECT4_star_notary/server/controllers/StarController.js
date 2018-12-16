var exported = {
    
    POST_requestValidation: function RequestValidation_POST(request, h) {
        return 'POST_requestValidation';
    },

    POST_messageSigValidate: function POST_messageSigValidate(request, h) {
        return 'POST_messageSigValidate';
    },

    POST_block: function POST_block(request, h) {
        return 'POST_block';
    },

    GET_starByHash: function GET_starByHash(request, h) {
        return 'GET_starByHash';
    },

    GET_starByAddress: function GET_starByAddress(request, h) {
        return 'GET_starByAddress';
    },

    GET_blockByHeight: function GET_blockByHeight(request, h) {
        return 'GET_blockByHeight';
    },        

}
module.exports = exported