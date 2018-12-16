const Hapi = require('hapi');
/**
 * Class Definition for the REST API
 */
class TheServer {

    /**
     * Constructor that allows initialize the class 
     */
    constructor() {
		this.server = Hapi.Server({
            port: 8000,
            host: 'localhost'
        });
        this.initRoutes();
        this.start();
    }

    /**
     * Initilization of all the controllers
     */
	initRoutes() {
        // require("./TestController.js")(this.server); // For learning Hapi!
        require("./routes/TestRoutes.js")(this.server); // For learning Hapi!
        require("./routes/StarRoutes.js")(this.server); // For learning Hapi!
        // require("./BlockController.js")(this.server); // For project 3
	}
    
    async start() {
        await this.server.start();
        console.log(`Server running at: ${this.server.info.uri}`);
    }

}

new TheServer();