// address: request.payload.address,
//     star: {
//     ra: request.payload.star.ra,
//         dec: request.payload.star.dec,
//             mag: request.payload.star.mag,
//                 cen: request.payload.star.cen,
//                     story: Buffer(request.payload.star.story).toString('hex')
// }

class Star {
    constructor(data) {
        this.data = data;
        console.log('New Star object instantiated');
    }

    validate() {
        if (!('dec' in this.data['star'])) { throw new Error('Missing dec') }
        if (this.data['star']['dec'].length > 20) { throw new Error('dec too long') }

        if (!('ra' in this.data['star'])) { throw new Error('Missing ra') }
        if (this.data['star']['ra'].length > 20) { throw new Error('ra too long') }

        if (!('story' in this.data['star'])) { throw new Error('Missing story') }
        if (this.data['star']['story'].length > 250) { throw new Error('story too long') }
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