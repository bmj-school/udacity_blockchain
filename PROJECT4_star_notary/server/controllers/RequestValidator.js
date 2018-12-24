

const SHA256 = require('crypto-js/sha256');

const testingTimeStep = 100; //[ms] set to 1000 for final production
// const TimeoutRequestsWindowTime = 5 * testingTimeStep; //[ms] 1000;
const TimeoutRequestsWindowTime = 5*60*1000; //[ms] 5 minutes window

/**
 * Data model for Requests
 */
class Invitation {
    constructor(requestObj){
        this.registerStar = true;
        this.status = {
           address: requestObj.address,
           requestTimeStamp: requestObj.requestTimeStamp,
           message: message,
           validationWindow: validationWindow,
           messageSignatjure: valid
        
        };
    console.log('New invitation for a star registry entry.');
    }
}




class Request {
    constructor(address) {
        this.address = address
        this.requestTimestamp = Date.now();
        this.message = `${this.address}:${this.requestTimestamp}:starRegistry`
    }

    respond() {
        return {
            'address': this.address,
            'requestTimestamp': this.requestTimestamp,
            'message': this.message,
            'validationWindow': Math.ceil((TimeoutRequestsWindowTime + (this.requestTimestamp - Date.now()))/1000)
        }
    }
    
    invite(){
        return new Invitation(this);
    }
}

class RequestPool {
    constructor() {
        this.mempool = {}; // address:Request
        this.timeoutRequests = {}; // Storing removal triggers
        this.validRequests = {} // Move a Request here after validation 
        console.log(`New RequestPool with timeout window of ${TimeoutRequestsWindowTime / 1000} s`);
        
    }

    // requestVaidation(address) {
    //     console.log(address);
    //     this.timeoutRequests[address] = setTimeout(function () {
    //         self.removeValidationRequest(request.walletAddress)
    //     }, TimeoutRequestsWindowTime);
    // }

    removeValidationRequest(address) {
        delete this.mempool[address]
        delete this.timeoutRequests[address]
        console.log(`Removed ${address} from mempool`);

    }
    
    addRequest(address) {
        if (address in this.mempool) {
            console.log('Already in requests!');
            // TODO: Return the request.respond
        } else {
            var self = this // Need to keep the instance in scope, this is not in scope!
            // This is a new Request
            this.mempool[address] = new Request(address);
            // Add a countdown to this address key
            this.timeoutRequests[address] = setTimeout(
                function () {
                    self.removeValidationRequest(address)
                }, TimeoutRequestsWindowTime);
            console.log(`Added ${address} to mempool`);
            // TODO: Return the request.respond
            return this.mempool[address].respond()
        }
    }


    listRequests() {
        for (const [key, value] of Object.entries(this.mempool)) {
            console.log(key, value);
        }
    }
}

if (0) {
    console.log('\n\n');
    console.log('**** TESTING ****');

    mp = new RequestPool

    thisNum = Math.random();
    let thisAddress1 = SHA256(thisNum.toString()).toString();
    console.log(`Test address1: ${thisAddress1}`);

    thisNum = Math.random();
    let thisAddress2 = SHA256(thisNum.toString()).toString();
    console.log(`Test address2: ${thisAddress2}`);


    // For timestep simulation
    var timesteps = 20;
    var currStep = 1;

    console.log('\n\n');

    // console.log(`Mempool: ${mp.mempool}`);

    var interval = setInterval(function () {
        if (currStep <= timesteps) {

            if (currStep === 2) {
                mp.addRequest(thisAddress1)
            } else if (currStep === 4) {
                mp.addRequest(thisAddress1)
            }


            // console.log(`Timestep ${currStep}`);
            // console.log(`Mempool: ${JSON.stringify(mp.mempool)}`);
            // console.log(`Mempool: ${mp.mempool.keys()}`);
            console.log(`ts${currStep} Mempool with ${Object.keys(mp.mempool).length} keys: ${Object.keys(mp.mempool)}`);

            for (address in mp.mempool) {
                console.log(mp.mempool[address].respond())
            }


            currStep++;
        }
        else {
            clearInterval(interval);
        }
    }, testingTimeStep)


}

module.exports = {
    RequestPool
};