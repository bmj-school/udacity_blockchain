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

  it(`Second test...`, async function () {
    assert.equal(true, true, "message");
  });
});
