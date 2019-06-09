const truffleAssert = require('truffle-assertions'); // Extra utilities for testing Smart Contracts
var Test = require('../config/testConfig.js');
var BigNumber = require('bignumber.js');
var path = require('path');
var scriptName = path.basename(__filename);
function log(_string) {
  console.log("\x1b[2m%s\x1b[0m", `\t${scriptName}: ${_string}`);
}

contract('Oracles', async (accounts) => {
  log('oracles.js: Initiating contract')
  const TEST_ORACLES_COUNT = 20;
  var config;

  // Watch contract events
  const STATUS_CODE_UNKNOWN = 0;
  const STATUS_CODE_ON_TIME = 10;
  const STATUS_CODE_LATE_AIRLINE = 20;
  const STATUS_CODE_LATE_WEATHER = 30;
  const STATUS_CODE_LATE_TECHNICAL = 40;
  const STATUS_CODE_LATE_OTHER = 50;

  before('setup contract', async () => {
    config = await Test.Config(accounts);
    log(`Oracle accounts: ${config.testOtherAccounts.length}`);

  });


  it('can register oracles', async () => {
    let fee = await config.flightSuretyApp.REGISTRATION_FEE.call();
    log(`Registration fee: ${fee}`)

    for (addr of config.testOtherAccounts) {
      await config.flightSuretyApp.registerOracle({ from: addr, value: fee });
      let result = await config.flightSuretyApp.getMyIndexes.call({ from: addr });
      log(`Oracle Registered, three indices assigned: ${result[0]}, ${result[1]}, ${result[2]}`);
    }


  });

  it('can request flight status', async () => {

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    let airline = config.testAirlineAccounts[0];
    let flight = 'ND1309'; // Course number
    let timestamp = Math.floor(Date.now() / 1000);

    // Submit a request for oracles to get status information for a flight
    tx = await config.flightSuretyApp.fetchFlightStatus(airline, flight, timestamp);
    truffleAssert.eventEmitted(tx, 'OracleRequest');
    let requestIndex = tx.logs[0].args['index'].toNumber();
    log(`OracleRequest on index: ${requestIndex}`);

    // ACT

    // Since the Index assigned to each test account is opaque by design
    // loop through all the accounts and for each account, all its Indexes (indices?)
    // and submit a response. The contract will reject a submission if it was
    // not requested so while sub-optimal, it's a good test of that feature
    let oracleNum = 0;

    for (addr of config.testOtherAccounts) {
      // Get oracle information
      let oracleIndexes = await config.flightSuretyApp.getMyIndexes.call({ from: addr });
      log(`Oracle ${oracleNum} over ${oracleIndexes}`);

      for (let a = 0; a < 3; a++) {
        // await sleep(100);
        let thisIdx = oracleIndexes[a];
        if (thisIdx == requestIndex) {
          try {
            await config.flightSuretyApp.submitOracleResponse(
              thisIdx, //   uint8 index,
              airline, // address airline,
              flight,  // string flight,
              timestamp, // uint256 timestamp,
              STATUS_CODE_ON_TIME, //   uint8 statusCode
              { from: addr });
            log(`\t ${thisIdx}==${requestIndex}, accepted!!!`);
          } catch (e) {
            log(`\t ${thisIdx}==${requestIndex}, accepted!!!`);
          }
        } else {

          try {
            // Submit a response...it will only be accepted if there is an Index match
            truffleAssert.reverts(
              await config.flightSuretyApp.submitOracleResponse(
                thisIdx, //   uint8 index,
                airline, // address airline,
                flight,  // string flight,
                timestamp, // uint256 timestamp,
                STATUS_CODE_ON_TIME, //   uint8 statusCode
                { from: addr }),
              "Flight or timestamp do not match oracle request");

          } catch (e) {
            // Enable this when debugging
            log(`\t ${thisIdx}!=${requestIndex}, rejected`)
          }


          // log(`\t ${thisIdx}!=${requestIndex}, rejected`)
          // await truffleAssert.reverts(
          //   config.flightSuretyApp.submitOracleResponse(
          //     thisIdx, //   uint8 index,
          //     airline, // address airline,
          //     flight,  // string flight,
          //     timestamp, // uint256 timestamp,
          //     STATUS_CODE_ON_TIME, //   uint8 statusCode
          //     { from: addr }),
          //   "Flight or timestamp do not match oracle request"
          // );

        }
      }
      oracleNum++;
    }


  });


  // it('can request flight status (New version)', async () => {

  //   let airline = config.testAirlineAccounts[0];
  //   let flight = 'ND1309'; // Course number
  //   let timestamp = Math.floor(Date.now() / 1000);

  //   // Submit a request for oracles to get status information for a flight
  //   tx = await config.flightSuretyApp.fetchFlightStatus(airline, flight, timestamp);
  //   truffleAssert.eventEmitted(tx, 'OracleRequest');
  //   // OracleRequest(index: 1, airline: 0xf17f52151ebef6c7334fad080c5704d77216b732, flight: ND1309, timestamp: 1558977870)
  //   console.log('OracleRequest:');
  //   console.log(tx.logs[0].args);


  //   for (addr of config.testOtherAccounts) {
  //     // Get oracle information
  //     let r = await config.flightSuretyApp.getMyIndexes.call({from: addr});
  //     let oracleIndexes = await config.flightSuretyApp.getMyIndexes.call({ from: addr});
  //     log(`Oracle ${addr} on ${oracleIndexes}`)
  //     for(let idx=0;idx<3;idx++) {
  //       try {
  //         // Submit a response...it will only be accepted if there is an Index match
  //         await config.flightSuretyApp.submitOracleResponse(
  //           oracleIndexes[idx],
  //           airline,
  //           flight,
  //           BigNumber(timestamp),
  //           STATUS_CODE_ON_TIME, { from: addr });
  //       }
  //       catch(e) {
  //         // console.log(e);
  //         // Enable this when debugging
  //          log(`\tError on index ${idx} ${oracleIndexes[idx].toNumber()} ${flight} ${timestamp}`);
  //       }
  //     }
  //   }
  //   // uint8 index,
  //   // address airline,
  //   // string flight,
  //   // uint256 timestamp,
  //   // uint8 statusCode
  // });



});
