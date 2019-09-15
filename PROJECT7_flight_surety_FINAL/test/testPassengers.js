// Simple logging util
const sha3 = require('js-sha3').keccak_256

var path = require('path');
var scriptName = path.basename(__filename);
function log(_string){
  console.log("\x1b[2m%s\x1b[0m", `\t${scriptName}: ${_string}`);
}

// Begin main test script
const truffleAssert = require('truffle-assertions'); // Extra utilities for testing Smart Contracts

// var FlightData = artifacts.require("FlightData");
var Test = require('../config/testConfig.js');

contract('Passenger Tests', async (accounts) => {

  var config;

  before('setup contract', async () => {
    config = await Test.Config(accounts);
    // Authorize the DApp to modify data
    config.airlineData.authorizeCaller(config.flightSuretyApp.address, {from: config.owner})
    thisAirline = await config.airlineData.getAirline(config.testAirlineAccounts[0]) 
    let fundingAmount = web3.toWei(10, "ether")
    tx = await config.flightSuretyApp.fund({from: config.testAirlineAccounts[0], value: fundingAmount})
    truffleAssert.eventEmitted(tx, 'AirlineFunded');
    log(`First airline: name=${thisAirline[0]}, address=${thisAirline[1]}, state=${thisAirline[2]}, votes=${thisAirline[3]}`)
    
    // Create a second airline
    tx = await config.flightSuretyApp.registerAirline('Airline 2', config.testAirlineAccounts[1], {from: config.testAirlineAccounts[0]})
    tx = await config.flightSuretyApp.fund({from: config.testAirlineAccounts[1], value: fundingAmount})
    // Register
    let airline = config.testAirlineAccounts[0];
    let flightName = 'A111';
    let flightTime = 1000;
    tx = await config.flightSuretyApp.registerFlight(flightName, flightTime, {from: airline})
    log(`${tx.logs[0].event} key: ${tx.logs[0].args.flightKey} by: ${tx.logs[0].args.airline}`);
    assert(tx.logs[0].args.airline == config.testAirlineAccounts[0])

    let fkey = tx.logs[0].args.flightKey;
    log(`Registered flight key: ${fkey}`);
    // Get a flight
    tx = await config.flightData.getFlight(airline, flightName, flightTime);
    // console.log('Flight:', tx);
    tx = await config.flightData.getFlightByKey(fkey);
    // console.log('Flight by key:', tx) 
  });  

  it(`Passenger can buy insurance for a registered flight`, async function () {

    let airline = config.testAirlineAccounts[0];
    let flightName = 'A111';
    let flightTime = 1000;
    tx = await config.flightData.getFlight(airline, flightName, flightTime);
    // console.log(tx);
    let fkey = tx[0];
    log(`Retrieved flight key: ${fkey}`);
    
    tx = await config.flightData.getFlightByKey(fkey);

    p1 = config.testPassengerAccounts[0];
    let insuranceAmt = web3.toWei(0.5, "ether")
    log(`Passenger ${p1} to buy ${insuranceAmt} insurance for flight ${fkey}`);
    tx = await config.flightData.getFlightByKey(fkey);
    tx = await config.flightSuretyApp.buy(fkey, {from: p1, value: insuranceAmt});

    
    // truffleAssert.eventEmitted(tx, 'AirlineFunded');


  });


});
