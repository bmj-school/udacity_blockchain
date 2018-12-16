// For learning HAPI!
// Testing and demo endpoints start with `hello`
controller = require('../controllers/StarController')
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
        this.server.route({ method:'GET',    path:'/stars/hash',                    handler:controller.GET_starByHash}) 
        this.server.route({ method:'GET',    path:'/stars/address',                 handler:controller.GET_starByAddress}) 
        this.server.route({ method:'GET',    path:'/block',                         handler:controller.GET_blockByHeight}) 

    }
}

module.exports = (server) => { return new StarRoutes(server);}