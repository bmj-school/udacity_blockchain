// For learning HAPI!
// Testing and demo endpoints start with `hello`
controller = require('../controllers/StarController')

// For Swagger!
// const Inert = require('inert');
// const Vision = require('vision');
// const HapiSwagger = require('hapi-swagger');


/**
 * Controller Definition 
 */
class StarRoutes {
    /**
     * Constructor 
     * @param {*} server 
     */
    constructor(server) {
        this.server = server;
        this.blocks = [];

        this.server.route({ method:'POST',   path:'/requestValidation',             handler:controller.POST_requestValidation}) 
        this.server.route({ method:'POST',   path:'/message-signature/validate',    handler:controller.POST_messageSigValidate}) 
        this.server.route({ method:'POST',   path:'/block',                         handler:controller.POST_block}) 
        this.server.route({ method:'GET',    path:'/stars/hash:{BLOCK_HASH}',       handler:controller.GET_starByHash}) 
        this.server.route({ method:'GET',    path:'/stars/address:{BLOCK_ADDRESS}', handler:controller.GET_starByAddress}) 
        this.server.route({ method:'GET',    path:'/block/{BLOCK_HEIGHT}',          handler:controller.GET_blockByHeight}) 

    }
}

module.exports = (server) => { return new StarRoutes(server);}