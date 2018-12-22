Date
// const TimeoutRequestsWindowTime = 5*60*1000;
const TimeoutRequestsWindowTime = 1500;

// timer = 
//
class RequestPool {
    constructor() {
        // A simple dict with address : request time
        this.mempool = {};
        // this.timeoutRequests  = [];
    }

    requestVaidation(address){
        console.log(address);
            this.timeoutRequests[address] = setTimeout( function(){
            self.removeValidationRequest(request.walletAddress) 
        }, TimeoutRequestsWindowTime );
    }

    addRequest(address){
        this.mempool[address] = 
    }
}

// self.timeoutRequests[request.walletAddress]=setTimeout(function(){ self.removeValidationRequest(request.walletAddress) }, TimeoutRequestsWindowTime );


mp = new RequestPool
mp.requestVaidation("asdfasdf")
console.log(mp.mempool);
console.log(mp.timeoutRequests);
// setTimeout()
