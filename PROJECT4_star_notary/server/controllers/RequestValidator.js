
// const TimeoutRequestsWindowTime = 5*60*1000;
const TimeoutRequestsWindowTime = 1500;

// timer = 
//
class MemPool {
    constructor() {
        this.mempool = [];
        this.timeoutRequests  = [];
    }

    requestVaidation(address){
        console.log(address);
        this.timeoutRequests[address] = setTimeout( function(){
        self.removeValidationRequest(request.walletAddress) 
    }, TimeoutRequestsWindowTime );
    }

    
    
}

// self.timeoutRequests[request.walletAddress]=setTimeout(function(){ self.removeValidationRequest(request.walletAddress) }, TimeoutRequestsWindowTime );


mp = new MemPool
mp.requestVaidation("asdfasdf")
console.log(mp.mempool);
console.log(mp.timeoutRequests);
// setTimeout()
