// For learning HAPI!
// Testing and demo endpoints start with `hello`

/**
 * Controller Definition 
 */
class TestController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} server 
     */
    constructor(server) {
        this.server = server;
        this.blocks = [];
        this.helloGet(); // 1
        this.helloPost(); // 2
        this.helloPostIndex(); // 3
        this.helloGreetUser(); // 4
    }

    helloGet(){
        // Test route 1
        this.server.route({
            method:'GET',
            path:'/api/hello',
            handler:function(request,h) {
                console.log(request.payload);
                return'hello world';
            }
        });
    }

    helloPost(){
        // Test route 2
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

    helloGreetUser(){
        // Test route 3
        this.server.route({
            method:'GET',
            path:'/api/greet/{user}',
            handler:function(request,h) {
                // console.log(request.payload);
                // console.log(JSON.stringify(request.payload));
                var usr = encodeURIComponent(request.params.user)
                return `hello ${usr}`;
            }
        });
    }

    helloPostIndex(){
        // Test route 4
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
}

/**
 * Exporting the Testontroller class
 * @param {*} server 
 */
module.exports = (server) => { return new TestController(server);}