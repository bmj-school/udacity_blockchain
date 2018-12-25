const Request = require('../models/Request')
const Invitation = require('../models/Invitation')
const SHA256 = require('crypto-js/sha256');
const config = require('../config/config')

/**
 * Store Requests and Invitations in memory.
 * Manage and validate.
 */
class RequestPool {
    constructor() {
        this.mempool = {}; // address:Request
        this.timeoutRequests = {}; // Storing removal triggers
        this.validRequests = {} // Move a Request here after validation
        console.log(`New RequestPool with timeout window of ${config.TimeoutRequestsWindowTime / 1000} s`);
    }

    /**
     * 
     * @param {*} address 
     */
    removeValidationRequest(address) {
        delete this.mempool[address]
        delete this.timeoutRequests[address]
        console.log(`Removed ${address} from mempool`);

    }

    removeInvitation(address) {
        delete this.validRequests[address]
        console.log(`Removed ${address} from invitation pool.`);
    }
    /**
     * 
     * @param {*} address 
     */
    addRequest(address) {
        if (address in this.mempool) {
            // TODO: 
            console.log('Already in requests pool!');
        } else if (address in this.validRequests) {
            // TODO: 
            console.log('Already validated, submit your star!');
        } else {
            var self = this // Need to keep the instance in scope, this is not in scope!
            // This is a new Request
            this.mempool[address] = new Request(address);
            // Add a countdown to this address key
            this.timeoutRequests[address] = setTimeout(
                function () {
                    self.removeValidationRequest(address)
                }, config.TimeoutRequestsWindowTime);
            console.log(`Added ${address} to mempool`);
            return this.mempool[address].respond()
        }
    }

    /**
     * After signing the request, a wallet is approved for all time.
     * Remove the wallet from the mempool and the timeout. 
     * Add the wallet the invitation pool. 
     * @param {*} address 
     */
    approveWallet(address) {
        // Create the invite, add to the pool
        this.validRequests[address] = this.mempool[address].invite()
        console.log(this.validRequests[address]);
        console.log(`Added ${address} to approved pool.`);
        // Remove the old request
        this.removeValidationRequest(address)
    }

    /**
     * Utility.
     */
    listRequests() {
        for (const [key, value] of Object.entries(this.mempool)) {
            console.log(key, value);
        }
    }
}

/** 
 * IGNORE - initial testing
 */
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