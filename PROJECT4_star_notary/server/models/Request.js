const Invitation = require('./Invitation')
const config = require('../config/config')
/**
 * An user, identified by 'address', can request a validation
 * 
 */

class Request {
    constructor(address) {
        this.address = address
        this.requestTimestamp = Date.now();

        this.message = `${this.address}:${this.requestTimestamp}:starRegistry`
        // TODO: make this request dynamic or statis for testing / production
        // this.message = `${this.address}:\${this.requestTimestamp}:starRegistry`
    }

    respond() {
        return {
            'address': this.address,
            'requestTimestamp': this.requestTimestamp,
            'message': this.message,
            'validationWindow': Math.ceil((config.TimeoutRequestsWindowTime + (this.requestTimestamp - Date.now())) / 1000)
        }
    }

    /**
     * After successful validation, this Request object is converted to an Invitation object. 
     */
    invite() {
        return new Invitation(this);
    }
}

module.exports = Request;