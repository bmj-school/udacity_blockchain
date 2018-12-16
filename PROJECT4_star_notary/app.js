const Hapi = require('hapi');
/**
 * Class Definition for the REST API
 */
class BlockAPI {

    /**
     * Constructor that allows initialize the class 
     */
    constructor() {
		this.server = Hapi.Server({
            port: 8000,
            host: 'localhost'
        });
        this.initControllers();
        this.start();
    }

    /**
     * Initilization of all the controllers
     */
	initControllers() {
        // require("./TestController.js")(this.server); // For learning Hapi!
        require("./TestControllerRefactor.js")(this.server); // For learning Hapi!
        // require("./BlockController.js")(this.server); // For project 3
	}
    
    async start() {
        await this.server.start();
        console.log(`Server running at: ${this.server.info.uri}`);
    }

}

new BlockAPI();