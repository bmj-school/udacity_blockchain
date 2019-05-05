
var Test = require('../config/testConfig.js');

console.log('Initiating airlines.js tests');

contract('Airline Requirement Tests', async (accounts) => {
    console.log('Initiating contract')
  var config;
  before('setup contract', async () => {
    config = await Test.Config(accounts);
    // await config.flightSuretyData.authorizeCaller(config.flightSuretyApp.address);
  });

  it(`First airline is registered when contract is deployed`, async function () {
    // Therefore, constructor should register an airline
    assert.equal(true, true, "message");


  });

  it(`Only existing airline may register a new airline until there are at least four airlines registered`, async function () {
    assert.equal(true, true, "message");
            
  });

  it(`Registration of fifth and subsequent airlines requires multi-party consensus of 50% of registered airlines`, async function () {
    assert.equal(true, true, "message");
      
  });

  it(`Airline can be registered, but does not participate in contract until it submits funding of 10 ether`, async function () {
    assert.equal(true, true, "message");

  });

});
