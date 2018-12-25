const config = require('../config/config')

/**
 * After user is validated (signed message), the request is converted into an 
 * Invitation to register a star.
 */
class Invitation {
    constructor(requestObj) {
        this.registerStar = true;
        this.address = requestObj.address;
        this.requestTimeStamp = requestObj.requestTimeStamp;
        this.message = requestObj.message;
        this.validationWindow = requestObj.validationWindow;
        this.messageSignature = 'true';
        console.log('New invitation for a star registry entry.');
    }

    respond() {
        return {
            'registerStar': 'true',
            'status': {
                'address': this.address,
                'requestTimestamp': this.requestTimestamp,
                'message': this.message,
                'validationWindow': Math.ceil((config.TimeoutRequestsWindowTime + (this.requestTimestamp - Date.now())) / 1000),
                'messageSignature': this.messageSignature
            }

        }
    }
}

module.exports = Invitation;