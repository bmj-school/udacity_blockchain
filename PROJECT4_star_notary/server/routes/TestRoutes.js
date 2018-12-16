// For learning HAPI!
// Testing and demo endpoints start with `hello`
controller = require('../controllers/TestController')

/**
 * Controller Definition 
 */
class TestController {

    /**
     * Constructor 
     * @param {*} server 
     */
    constructor(server) {
        this.server = server;
        this.blocks = [];
        // this.helloGet(); // 1
        this.server.route({ method:'GET', path:'/api/hello', handler:controller.helloGet }) 
        this.server.route({ method:'POST', path:'/api/hello', handler:controller.helloPost });
        this.server.route({ method:'GET', path:'/api/greet/{user}', handler:controller.helloGreetUser });
        this.server.route({ method:'GET', path:'/api/number/{index}', handler:controller.helloNumberIndex });
        // this.helloPost(); // 2
        // this.helloNumberIndex(); // 3
        // this.helloGreetUser(); // 4
    }

    // helloGet(){ 
    //     this.server.route({ method:'GET', path:'/api/hello', handler:controller.helloGet }) 
    // }

    // helloPost(){
    //     this.server.route({ method:'POST', path:'/api/hello', handler:controller.helloPost });
    // }

    // helloGreetUser(){
    //     this.server.route({ method:'GET', path:'/api/greet/{user}', handler:controller.helloGreetUser });
    // }

    // helloNumberIndex(){
    //     // Test route 4
    //     this.server.route({ method:'GET', path:'/api/number/{index}', handler:controller.helloNumberIndex });
    // }
}

/**
 * Exporting the Testontroller class
 * @param {*} server 
 */
module.exports = (server) => { return new TestController(server);}