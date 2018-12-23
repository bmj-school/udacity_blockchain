const SHA256 = require('crypto-js/sha256');

// const TimeoutRequestsWindowTime = 5*60*1000;
const TimeoutRequestsWindowTime = 5*1000;
console.log(`Request window: ${TimeoutRequestsWindowTime} s`);


// let d = Date.now()
// console.log(d);
class Request {
    constructor(data) {
      this.requestTime = Date.now();


    }
  }

class RequestPool {
    constructor() {
        // A simple dict with address : request time
        this.mempool = {};
        this.timeoutRequests = {};
        // this.removeValidationRequest();
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
        var self = this // Need to keep the instance in scope, this is not in scope!

        this.mempool[address] = new Request;
        // Add a countdown to this address key
        this.timeoutRequests[address] = setTimeout(
            function () {
                self.removeValidationRequest(address)
            }, TimeoutRequestsWindowTime);


        console.log(`Added ${address} to mempool`);
        

    }


    listRequests() {

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
var delaytime = 1000; // milliseconds
var currStep = 1;

console.log('\n\n');

// console.log(`Mempool: ${mp.mempool}`);

var interval = setInterval(function () {
    if (currStep <= timesteps) {
        if (currStep === 2) {
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
}, delaytime)