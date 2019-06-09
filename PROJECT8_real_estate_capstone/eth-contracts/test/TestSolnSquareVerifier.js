//var SquareVerifier = artifacts.require('SquareVerifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');

const proofJson = require('./proof');
const proof = proofJson.proof;
const input = proofJson.input;

contract('SolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    let tokenId = 1;

    before(async function () {
        var verifier = await Verifier.new({from: account_one});
        this.contract = await SolnSquareVerifier.new(verifier.address, {from: account_one});
    })

    it('Test if an ERC721 token can be minted for contract', async function () { 
        // Including adding a new solution to contract
        await this.contract.mintVerifiedTokenTo(account_two, tokenId,
            proof.A,
            proof.A_p,
            proof.B,
            proof.B_p,
            proof.C,
            proof.C_p,
            proof.H,
            proof.K,
            input,
            {from: account_one});

        let ownerOfTokenId = await this.contract.ownerOf(tokenId);
        assert.equal(ownerOfTokenId, account_two, "Error owner does not match");
    })

    it('A repeated solution cannot be added', async function () { 

        let isAdded = true;
        let errorReason = '';
        
        // Trying to add the same solution above
        try {
            await this.contract.mintVerifiedTokenTo(account_two, tokenId,
                proof.A,
                proof.A_p,
                proof.B,
                proof.B_p,
                proof.C,
                proof.C_p,
                proof.H,
                proof.K,
                input,
                {from: account_one});
        } catch(e) {
            //console.log(e.reason);
            errorReason = e.reason;
            isAdded = false;
        }
        
        assert.equal(isAdded, false, "false");
        assert.equal(errorReason, 'tokenId already exists', "repeat soln");
    })
})
