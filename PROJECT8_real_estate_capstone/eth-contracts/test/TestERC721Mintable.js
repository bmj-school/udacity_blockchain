var ERC721MintableRealEstate = artifacts.require('ERC721MintableRealEstate');

contract('TestERC721Mintable', accounts => {

    describe('match erc721 spec', function () {
        let tokenId = 1;
        before(async function () {
            this.contract = await ERC721MintableRealEstate.new({from: accounts[0]});

            // Mint 2 tokens from first acct
            try {
                await this.contract.mint(accounts[0], tokenId, {from: accounts[0]});
            } catch (e) {
                console.log(e);
            }
            tokenId ++;
            
            try {
                await this.contract.mint(accounts[1], tokenId, {from: accounts[0]});
            } catch (e) {
                console.log(e);
            }
            tokenId ++;
        })
        

        it('should return total supply', async function () { 
            let result = await this.contract.totalSupply.call({from: accounts[0]});
            //console.log(Number(result));
            assert.equal(Number(result), 2, "supply does not match");
        })

        it('should get token balance', async function () { 
            let result = await this.contract.balanceOf.call(accounts[1], {from: accounts[0]});
            assert.equal(Number(result), 1, "Wrong balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let result = await this.contract.tokenURI.call(1, {from: accounts[0]});
            //console.log(result);
            assert.equal(result, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "TokenURI not expected");
        })

        it('should transfer token from one owner to another', async function () { 
            
            let b1 = await this.contract.balanceOf.call(accounts[0], {from: accounts[0]});
            let b2 = await this.contract.balanceOf.call(accounts[1], {from: accounts[1]});

            await this.contract.transferFrom(accounts[1], accounts[0], 2, {from: accounts[1]});

            let updatedB1 = await this.contract.balanceOf.call(accounts[0], {from: accounts[0]});
            let updatedB2 = await this.contract.balanceOf.call(accounts[1], {from: accounts[1]});

            assert.equal(Number(updatedB1), Number(b1) + 1, "Error in transferring token");
            assert.equal(Number(updatedB2), Number(b2) - 1, "Error in transferring token");
        })
    });

    describe('have ownership properties', function () {

        let tokenId = 1;

        beforeEach(async function () { 
            this.contract = await ERC721MintableRealEstate.new({from: accounts[0]});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let isFailed = false;
            
            try {
                await this.contract.mint(accounts[0], tokenId, {from: accounts[1]});
            } catch (e) {
                isFailed = true;
            }

            assert.equal(isFailed, true, "Address must be the contract owner");
        })

        it('should return contract owner', async function () { 
            let contractOwner = await this.contract._owner.call({from: accounts[0]});
            assert.equal(contractOwner, accounts[0], "Cannor call contract owner");
        })

    });
})