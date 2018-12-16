'use strict';


const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
});



(async () => {
    try {
        await server.start();
        // Once started, connect to Mongo through Mongoose
        console.log(`Server running at: ${server.info.uri}`);
    }
    catch (err) {
        console.log(err)
    }
})();  