/**
 * The Star data model.
 */
class Star {
    constructor(data) {
        this.data = data;
        console.log('New Star object instantiated');
    }

    validate() {
        // TODO: How to properly handle these errors in Hapi???
        if (!('dec' in this.data['star'])) { return 'Missing dec' }
        if (this.data['star']['dec'].length > 20) { return 'dec too long' }

        if (!('ra' in this.data['star'])) { return 'Missing ra' }
        if (this.data['star']['ra'].length > 20) { return 'ra too long' }

        if (!('story' in this.data['star'])) { return 'Missing story' }
        if (this.data['star']['story'].length > 250) { return 'story too long' }

        return true
    }

    /**
     * Encode the star story before entering it into the blockchain
     */
    asBlockBody() {
        let body = this.data;
        body['star']['story'] = Buffer(body['star']['story']).toString('hex');
        return body;
    }

    /**
     * Decode
     */
    respond() {
        let respondData = this.data;
        respondData['star']['story'] = respondData['star']['story']

    }

}

module.exports = Star;