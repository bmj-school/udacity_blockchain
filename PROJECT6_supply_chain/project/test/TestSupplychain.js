// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain')

const truffleAssert = require('truffle-assertions');

contract('SupplyChain', function(accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli

    let supplyChain = null;

    var sku = 1
    var upc = 1
    const ownerID = accounts[0]
    const originFarmerID = accounts[1]
    const originFarmName = "John Doe"
    const originFarmInformation = "Yarray Valley"
    const originFarmLatitude = "-38.239770"
    const originFarmLongitude = "144.341490"
    var productID = sku + upc
    const productNotes = "Best beans for Espresso"
    const productPrice = web3.toWei(5, "ether")
    var itemState = 0
    const distributorID = accounts[2]
    const retailerID = accounts[3]
    const consumerID = accounts[4]
    const emptyAddress = '0x00000000000000000000000000000000000000'

    const overPayPrice = web3.toWei(8, "ether")
    const underPayPrice = web3.toWei(3, "ether")

    ///Available Accounts
    ///==================
    ///(0) 0x27d8d15cbc94527cadf5ec14b69519ae23288b95
    ///(1) 0x018c2dabef4904ecbd7118350a0c54dbeae3549a
    ///(2) 0xce5144391b4ab80668965f2cc4f2cc102380ef0a
    ///(3) 0x460c31107dd048e34971e57da2f99f659add4f02
    ///(4) 0xd37b7b8c62be2fdde8daa9816483aebdbd356088
    ///(5) 0x27f184bdc0e7a931b507ddd689d76dba10514bcb
    ///(6) 0xfe0df793060c49edca5ac9c104dd8e3375349978
    ///(7) 0xbd58a85c96cc6727859d853086fe8560bc137632
    ///(8) 0xe07b5ee5f738b2f87f88b99aac9c64ff1e0c7917
    ///(9) 0xbd3ff2e3aded055244d66544c9c059fa0851da44

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Farmer: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])
    console.log("Retailer: accounts[3] ", accounts[3])
    console.log("Consumer: accounts[4] ", accounts[4])

    // Utility function to check Buffer One
    var _assertBufferOne = function(_resultBuffer, _ownerID) {
        var defaultOwnerID = _ownerID ? _ownerID : originFarmerID;
        assert.equal(_resultBuffer[0], sku, `Error: Invalid item SKU ${_resultBuffer[0]}`)
        assert.equal(_resultBuffer[1], upc, `Error: Invalid item UPC ${_resultBuffer[1]}`)
        assert.equal(_resultBuffer[2], defaultOwnerID, 'Error: Missing or Invalid ownerID')
        assert.equal(_resultBuffer[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(_resultBuffer[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(_resultBuffer[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(_resultBuffer[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(_resultBuffer[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
    }

    // Utility function to check Buffer Two
    var _assertBufferTwo = function(_resultBuffer, _productID, _productNotes, _price, _state, _processorID, _retailerID, _consumerID) {
        var defaultProductID =  _productID ? _productID : productID;
        var defaultProductNotes = _productNotes ? _productNotes : productNotes;
        var defaultPrice = _price ? _price : 0;
        var defaultState = _state ? _state: 0;
        var defaultProcessorID = _processorID ? _processorID : 0;
        var defaultRetailerID = _retailerID ? _retailerID : 0;
        var defaultConsumerID = _consumerID ? _consumerID : 0;

        assert.equal(_resultBuffer[0], sku, `Error: Invalid item SKU ${_resultBuffer[0]}`)
        assert.equal(_resultBuffer[1], upc, `Error: Invalid item UPC ${_resultBuffer[1]}`)
        assert.equal(_resultBuffer[2], defaultProductID, `Error: Invalid productID ${_resultBuffer[2]}`)
        assert.equal(_resultBuffer[3], defaultProductNotes, `Error: Invalid productNotes ${_resultBuffer[3]}`)
        assert.equal(_resultBuffer[4], defaultPrice, `Error: Invalid product price ${_resultBuffer[4]}`)
        assert.equal(_resultBuffer[5], defaultState, `Error: Invalid item State ${_resultBuffer[5]}`)
        assert.equal(_resultBuffer[6], defaultProcessorID, `Error: processorID should not be set at this point ${_resultBuffer[6]}`)
        assert.equal(_resultBuffer[7], defaultRetailerID, `Error: retailerID should not be set at this point ${_resultBuffer[7]}`)
        assert.equal(_resultBuffer[8], defaultConsumerID, `Error: consumerID should not be set at this point ${_resultBuffer[8]}`)
    }

    // (Step 0)
    // Ensure contract deployed
    // Setup all roles
    beforeEach( async() => {
        // Deploy the smart contract once
        supplyChain = await SupplyChain.deployed({from:ownerID})
        
        // Register each role, unless it's already registered
        if (!(await supplyChain.isFarmer(originFarmerID))) {
            console.log("\t\tRegistering Farmer", accounts[1])
            await supplyChain.registerFarmer(originFarmerID, {from:ownerID})
        }
       
        if (!(await supplyChain.isDistributor(distributorID))) {
            console.log("\t\tRegistering Distributor", accounts[2])
            await supplyChain.registerDistributor(distributorID, {from:ownerID})
        }

        if (!(await supplyChain.isRetailer(retailerID))) {
            console.log("\t\tRegistering Retailer", accounts[3])
            await supplyChain.registerRetailer(retailerID, {from:ownerID})
        }

        if (!(await supplyChain.isConsumer(consumerID))) {
            console.log("\t\tRegistering Consumer", accounts[4])
            await supplyChain.registerConsumer(consumerID, {from:ownerID})
        }
        
    });


    // 1st Test
    it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async() => {
        
        // Mark an item as Harvested by calling function harvestItem()
        let tx = await supplyChain.harvestItem(
            upc, 
            originFarmerID, 
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productNotes,
            {from:originFarmerID} // Ensure only farmer can harvest! Uncomment for testing 
            )
        
        // Nicer way to assert events
        truffleAssert.eventEmitted(tx, 'Harvested', (ev) => {
            return true;
            }, 'Contract should return the correct message.');

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        
        // Verify the result set
        _assertBufferOne(resultBufferOne)

        // Verify access control by ensuring that distributor cannot harvest.
        await truffleAssert.reverts(
                supplyChain.harvestItem(
                    upc, 
                    originFarmerID, 
                    originFarmName, 
                    originFarmInformation, 
                    originFarmLatitude, 
                    originFarmLongitude, 
                    productNotes,
                    {from:distributorID}),
            "Sender not authorized."
        );
    })    

    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async() => {

        // Verify access control by ensuring that distributor cannot process.
        await truffleAssert.reverts(supplyChain.processItem(upc, {from:distributorID}), "Sender not authorized.");

        // Mark an item as Processed by calling function processtItem()
        let tx = await supplyChain.processItem(upc, {from:originFarmerID})

        truffleAssert.eventEmitted(tx, 'Processed', (ev) => {
            return true;
            }, 'Contract should return the correct message.');
        
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)

        // Verify the result set
        _assertBufferOne(resultBufferOne)
    })    

    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async() => {
        // Verify access control by ensuring that distributor cannot pack.
        await truffleAssert.reverts(supplyChain.packItem(upc, {from:distributorID}), "Sender not authorized.");

        // Mark an item as Packed by calling function packItem()
        let tx = await supplyChain.packItem(upc, {from:originFarmerID})

        truffleAssert.eventEmitted(tx, 'Packed', (ev) => {
            return true;
            }, 'Contract should return the correct message.');

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)

        // Verify the result set
        _assertBufferOne(resultBufferOne)
    })    

    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async() => {
        // Verify access control by ensuring that distributor cannot buy direct from farmer
        await truffleAssert.reverts(supplyChain.sellItem(upc, productPrice, {from:retailerID}), "Sender not authorized.");

        // Mark an item as ForSale by calling function sellItem()
        let tx = await supplyChain.sellItem(upc, productPrice, {from:originFarmerID})
        console.log(`Product placed for sale at price ${productPrice}`);
        
        truffleAssert.eventEmitted(tx, 'ForSale', (ev) => {
            return true;
            }, 'Contract should return the correct message.');
 
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)

        // Verify the result set
        _assertBufferOne(resultBufferOne)
    })    

    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async() => {

        let buyerStartBalance = await web3.eth.getBalance(distributorID)
        let farmerStartBalance = await web3.eth.getBalance(originFarmerID)

        // Verify access control by ensuring that retailer cannot buy.
        await truffleAssert.reverts(supplyChain.buyItem(upc, {from:retailerID, value: productPrice, gasPrice: 0}), "Sender not authorized.");

        // Verify underpayment reverts
        await truffleAssert.reverts(supplyChain.buyItem(upc, {from:distributorID, value: underPayPrice, gasPrice: 0}), "Insufficient value transfer to cover price.");
        
        // Mark an item as Sold by calling function buyItem()
        tx = await supplyChain.buyItem(upc, {from:distributorID, value: overPayPrice, gasPrice: 0}) 
        let buyerEndBalance = await web3.eth.getBalance(distributorID)
        let farmerEndBalance = await web3.eth.getBalance(originFarmerID)
        
        // Assert correct ending balances for both parties
        assert.strictEqual(buyerStartBalance - buyerEndBalance, parseInt(productPrice))
        assert.strictEqual(farmerEndBalance - farmerStartBalance, parseInt(productPrice))

        truffleAssert.eventEmitted(tx, 'Sold', (ev) => {
            return true;
            }, 'Contract should return the correct message.');
 
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc) 

        // Verify the result set
        _assertBufferOne(resultBufferOne, distributorID)
    })    

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async() => {
        
        let tx = await supplyChain.shipItem(upc, {from:distributorID})

        truffleAssert.eventEmitted(tx, 'Shipped', (ev) => {
            return true;
            }, 'Contract should return the correct message.');
 
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)  

        // Verify the result set
        _assertBufferOne(resultBufferOne, distributorID)
    })    

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async() => {

        let tx = await supplyChain.receiveItem(upc, {from:retailerID})

        truffleAssert.eventEmitted(tx, 'Received', (ev) => {
            return true;
            }, 'Contract should return the correct message.');
 
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)  
        _assertBufferOne(resultBufferOne, retailerID)
    })    

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async() => {

        let tx = await supplyChain.purchaseItem(upc, {from:consumerID})

        truffleAssert.eventEmitted(tx, 'Purchased', (ev) => {
            return true;
            }, 'Contract should return the correct message.');
 

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)  
        _assertBufferOne(resultBufferOne, consumerID)
    })    

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async() => {
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        
        // Verify the result set:
        _assertBufferOne(resultBufferOne, consumerID);
    })

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async() => {
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        
        // Verify the result set:
        _assertBufferTwo(resultBufferTwo, productID, productNotes, productPrice, 7, distributorID, retailerID, consumerID)  
    })

});

