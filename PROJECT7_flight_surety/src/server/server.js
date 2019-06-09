import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
// import FlightSuretyData from '../../build/contracts/FlightSuretyData.json';
import Config from './config.json';
import Web3 from 'web3';
import express from 'express';
import { start } from 'repl';


let config = Config['localhost'];
let web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws')));
web3.eth.defaultAccount = web3.eth.accounts[0];
let flightSuretyApp = new web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
// let flightSuretyData = new web3.eth.Contract(FlightSuretyData.abi, config.dataAddress);

const ORACLES_COUNT = 21;

let oracle_accounts = [];
let fee = 1000000000000000000;// 1 ether in wei.
const STATUS_CODE_UNKNOWN = 0;
const STATUS_CODE_ON_TIME = 10;
const STATUS_CODE_LATE_AIRLINE = 20;
const STATUS_CODE_LATE_WEATHER = 30;
const STATUS_CODE_LATE_TECHNICAL = 40;
const STATUS_CODE_LATE_OTHER = 50;

const STATUS_CODES = [STATUS_CODE_UNKNOWN, STATUS_CODE_ON_TIME, STATUS_CODE_LATE_AIRLINE, STATUS_CODE_LATE_WEATHER, STATUS_CODE_LATE_TECHNICAL, STATUS_CODE_LATE_OTHER];

function getRandomStatusCode() {
  // All choices:
  // let choice = STATUS_CODES[Math.floor(Math.random() * STATUS_CODES.length)];
  // console.log('Random idx;',choice);
  // return choice;
  // return STATUS_CODES[Math.floor(Math.random() * STATUS_CODES.length)];

  // For testing, simulate randomly ON_TIME or LATE
  let coinFlip = (Math.floor(Math.random() * 2) == 0);
  // console.log(coinFlip);

  if (coinFlip) {
    return STATUS_CODE_LATE_AIRLINE;
  } else {
    return STATUS_CODE_ON_TIME;
  }
}

web3.eth.getAccounts((err, accounts) => {
  // flightSuretyData.methods
  //   .authorizeCaller(config.appAddress)
  //   .send({ from: accounts[0] }, (err, result) => {
  //     if(err) {
  //       console.log(err);
  //     } else {
  //       console.log("App authorized.");
  //     }
  //   });
  let startAcct = 25;
  let endAcct = 50
  for (let idx = startAcct; idx < endAcct; idx++) {
    flightSuretyApp.methods
      .registerOracle()
      .send({ from: accounts[idx], value: fee, gas: 6721975 }, (err, reg_result) => {
        if (err) {
          console.log('ERROR IN GET ACCOUNTS');

          // console.log(err);

        } else {
          flightSuretyApp.methods
            .getMyIndexes()
            .call({ from: accounts[idx] }, (err, res) => {
              if (err) {
                // console.log(err);
                console.log('ERROR IN GET INDICES');

              } else {
                let oracle = {
                  address: accounts[idx],
                  indexes: res
                };
                oracle_accounts.push(oracle);
                console.log(idx, "Oracle registered: " + JSON.stringify(oracle));
              }
            });
        }
      });
  }
});


flightSuretyApp.events.OracleRequest({
  fromBlock: 0
}, function (err, event) {
  if (err) {
    console.log('ERROR HERE');

    // console.log(err);

  } else {
    // let tsnow = new Date();
    console.log(Date(), 'Received event!');

    let index = event.returnValues.index;
    let airline = event.returnValues.airline;
    let flight = event.returnValues.flight;
    let timestamp = event.returnValues.timestamp;
    let statusCode = getRandomStatusCode();
    console.log(`The oracles are simulating a status code of ${statusCode}`);


    for (let idx = 0; idx < oracle_accounts.length; idx++) {

      if (oracle_accounts[idx].indexes.includes(index)) {
        // console.log("This oracle matches, sending update: " + JSON.stringify(oracle_accounts[idx]));

        flightSuretyApp.methods
          .submitOracleResponse(index, airline, flight, timestamp, statusCode)
          .send({ from: oracle_accounts[idx].address, gas: 200000 }, (err, res) => {
            if (err) {
              console.log(err);
              // console.log('No match');

            } else {
              console.log(idx, "Oracle Response " + JSON.stringify(oracle_accounts[idx]) + " Status Code: " + statusCode);
            }
          });
      } else {
        console.log(idx, `(Oracle does not match indices)`);
        
      }
    }
  }
});

const app = express();
app.get('/api', (req, res) => {
  res.send({
    message: 'An API for use with your Dapp!'
  })
})

export default app;


