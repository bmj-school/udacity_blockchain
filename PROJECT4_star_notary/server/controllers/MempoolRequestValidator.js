const SHA256 = require('crypto-js/sha256');

// const TimeoutRequestsWindowTime = 5*60*1000;
const testingTimeStep = 100; // ms, set to 1000 for final production
const TimeoutRequestsWindowTime = 5 * testingTimeStep; //1000;
console.log(`Request window: ${TimeoutRequestsWindowTime} s`);


// let d = Date.now()
// console.log(d);
class Request {
    constructor(address) {
        this.address = address
        this.requestTimestamp = Date.now();
    }

    thisResponse(){
        return {
            'address' : this.address,
            'requestTimestamp' : this.requestTimestamp,
            'message' : `${this.address}:${requestTimestamp}:${starRegistry}`,
            'validationWindow' : this.requestTimestamp - Date.now()  
        }
    }
}

class RequestPool {
    constructor() {
        this.mempool = {}; // A simple dict with address:Request
        this.timeoutRequests = {}; // A simple dict with address:timeout
    }

    requestVaidation(address) {
        console.log(address);
        this.timeoutRequests[address] = setTimeout(function () {
            self.removeValidationRequest(request.walletAddress)
        }, TimeoutRequestsWindowTime);
    }

    removeValidationRequest(address) {
        delete this.mempool[address]
        delete this.timeoutRequests[address]
        console.log(`Removed ${address} from mempool`);

    }

    addRequest(address) {
        if (address in this.mempool) {
            console.log('Already in requests!');
            // Return the Req

        } else {
            var self = this // Need to keep the instance in scope, this is not in scope!
            // This is a new Request
            this.mempool[address] = new Request;
            // Add a countdown to this address key
            this.timeoutRequests[address] = setTimeout(
                function () {
                    self.removeValidationRequest(address)
                }, TimeoutRequestsWindowTime);
            console.log(`Added ${address} to mempool`);
        }



    }


    listRequests() {
        for (const [key, value] of Object.entries(this.mempool)) {
            console.log(key, value);
        }
    }




}

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
        } else if (currStep === 4){
            mp.addRequest(thisAddress1)
        }


        // console.log(`Timestep ${currStep}`);
        // console.log(`Mempool: ${JSON.stringify(mp.mempool)}`);
        // console.log(`Mempool: ${mp.mempool.keys()}`);
        console.log(`ts${currStep} Mempool with ${Object.keys(mp.mempool).length} keys: ${Object.keys(mp.mempool)}`);
        currStep++;
    }
    else {
        clearInterval(interval);
    }
}, testingTimeStep)