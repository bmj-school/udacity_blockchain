// Simple logging util
var path = require('path');
var scriptName = path.basename(__filename);
function log(_string){
    // console.log(`${scriptName}: ${_string}`);
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

  it(`Second test...`, async function () {
    assert.equal(true, true, "message");
  });
});
