// Simple logging util
var path = require('path');
var scriptName = path.basename(__filename);
function log(_string){
    console.log(`${scriptName}: ${_string}`);
}

// Begin main test script
const truffleAssert = require('truffle-assertions'); // Extra utilities for testing Smart Contracts

// var FlightData = artifacts.require("FlightData");
log('Starting flights.js tests, top of script.');
var Test = require('../config/testConfig.js');

contract('Application Requirement Tests', async (accounts) => {

  log('application.js: Initiating contract')
  // var flightData = await FlightData.new();
  var config;

  before('setup contract', async () => {
    config = await Test.Config(accounts);
    // Authorize the DApp to modify data
    config.airlineData.authorizeCaller(config.flightSuretyApp.address, {from: config.owner})
  });  

  it(`First test...`, async function () {
    assert.equal(true, true, "message");
  });


  it(`First airline is registered when contract is deployed`, async function () {
    // Constructor should register an airline
    numAirlines = await config.airlineData.getNumAirlines();
    assert.equal(numAirlines, 1, "One airline registered");
    // thisAirline = await config.airlineData.getAirline(config.testAirlineAccounts[0]) 
    // log(`First airline name: ${thisAirline[0]}`)
    // assert.equal(thisAirline[1], config.testAirlineAccounts[0], 'First airline not matching configuration')
  });


  it(`Only existing airline may register a new airline until there are at least four airlines registered`, async function () {
    // Register 2
    tx = await config.flightSuretyApp.registerAirline('Airline 2', config.testAirlineAccounts[1], {from: config.testAirlineAccounts[0]})
    log(tx)
    truffleAssert.eventEmitted(tx, 'AirlineRegistered', (ev) => { return ev.name === 'Airline 2' });
    assert.equal(await config.flightData.getNumAirlines(), 2, "Two are not registered");

    // Register 3
    tx = await config.flightSuretyApp.registerAirline('Airline 3', config.testAirlineAccounts[2], {from: config.testAirlineAccounts[1]})

    log(`Second airline: ${await config.flightData.getAirline(config.testAirlineAccounts[1]) }`)
    log(`Third airline: ${await config.flightData.getAirline(config.testAirlineAccounts[2]) }`)

    // Fail to register 4, because the sender is not registered
    await truffleAssert.reverts(
      config.flightSuretyApp.registerAirline('Airline 4', config.testAirlineAccounts[3], {from: config.testAirlineAccounts[4]}), 
      "Only existing airlines can register new"
      )

    // Go ahead and register 4 from a registered airline
    tx = await config.flightSuretyApp.registerAirline('Airline 4', config.testAirlineAccounts[3], {from: config.testAirlineAccounts[2]})
    log(`Fourth airline: ${await config.flightSuretyApp.getData(config.testAirlineAccounts[3]) }`)
    
  });



  it(`Second test...`, async function () {
    assert.equal(true, true, "message");
  });
});
