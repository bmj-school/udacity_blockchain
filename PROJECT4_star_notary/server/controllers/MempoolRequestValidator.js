// Date
// const TimeoutRequestsWindowTime = 5*60*1000;
const TimeoutRequestsWindowTime = 5;

// timer = 
//
class RequestPool {
    constructor() {
        // A simple dict with address : request time
        this.mempool = {};
        // this.timeoutRequests  = [];
        this.addRequest();
        this.removeValidationRequest();

    }

    requestVaidation(address) {
        console.log(address);
        this.timeoutRequests[address] = setTimeout(function () {
            self.removeValidationRequest(request.walletAddress)
        }, TimeoutRequestsWindowTime);
    }

    removeValidationRequest(address) {
        delete this.mempool[address]
        console.log(`Removed ${address} from mempool`);
        
    }

    addRequest(address) {
        var self = this // Need to keep the instance in scope, this is not in scope!
        this.mempool[address] = setTimeout(
            function () {
                self.removeValidationRequest(address)
            }, TimeoutRequestsWindowTime);

    }


    listRequests() {

    }




}

// 

mp = new RequestPool
// mp.requestVaidation("asdfasdf")
console.log(mp.timeoutRequests);
// setTimeout()

// function checkPool() {
//     console.log('Mempool:');

//     console.log(mp.mempool);
// }

//  setTimeout(function() {
//     checkPool();
//  }, 1000); //milliseconds



const SHA256 = require('crypto-js/sha256');
let d = Date.now()
console.log(d);

thisNum = Math.random();
let thisAddress1 = SHA256(thisNum.toString()).toString();
console.log(`A1: ${thisAddress1}`);

thisNum = Math.random();
let thisAddress2 = SHA256(thisNum.toString()).toString();
console.log(`A2: ${thisAddress2}`);



// For timestep simulation
var timesteps = 5;
var time = 1;
var delaytime = 1000; // milliseconds



console.log(`Mempool: ${mp.mempool}`);

var interval = setInterval(function () {
    if (time <= timesteps) {
        if (time === 2) {
            mp.addRequest(thisAddress1)
        }
        console.log(`Timestep ${time}`);

        // console.log(`Mempool: ${JSON.stringify(mp.mempool)}`);
        // console.log(`Mempool: ${mp.mempool.keys()}`);
        console.log(`Mempool with ${Object.keys(mp.mempool).length} keys: ${Object.keys(mp.mempool)}`);


        time++;
    }
    else {
        clearInterval(interval);
    }
}, delaytime)