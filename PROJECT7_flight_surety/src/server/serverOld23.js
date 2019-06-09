import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import Config from './config.json';
import Web3 from 'web3';
import express from 'express';
import 'babel-polyfill';
var BigNumber = require('bignumber.js');

let config = Config['localhost'];
let web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws')));
web3.eth.defaultAccount = web3.eth.accounts[0];
let flightSuretyApp = new web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);

const STATUS_CODE_UNKNOWN = 0;
const STATUS_CODE_ON_TIME = 10;
const STATUS_CODE_LATE_AIRLINE = 20;
const STATUS_CODE_LATE_WEATHER = 30;
const STATUS_CODE_LATE_TECHNICAL = 40;
const STATUS_CODE_LATE_OTHER = 50;

const TEST_ORACLES_COUNT = 10;



class OracleHandler {

  constructor() {
    // let config = Config['localhost'];
    // this.web3 = new Web3(new Web3.providers.HttpProvider(config.url));
    // this.flightSuretyApp = new this.web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
    this.oracleAccounts = [];
    // console.log("App:", this.flightSuretyApp);

  }

  async registerOracles() {
    // Select oracle accounts 
    let START_ACCT = 40;
    let END_ACCT = 50;
    await web3.eth.getAccounts((error, accts) => {
      for (let a = START_ACCT; a < END_ACCT; a++) {
        this.oracleAccounts.push(accts[a]);
      }
    });
    console.log('Number of oracles:', this.oracleAccounts.length);

    // Get fee
    let fee = await flightSuretyApp.methods.REGISTRATION_FEE.call();
    console.log(`Registration fee: ${fee}`);

    // Register the oracles:
    for (let a = 0; a < this.oracleAccounts.length; a++) {
      console.log('Registering', this.oracleAccounts[a]);

      function callback(error, result) {
        if (error) {
          console.log('ERROR');

        }
        console.log("Success", result);
      }

      try {
        // console.log("Reg:", console.log(flightSuretyApp.methods.registerOracle()));
        // console.log(flightSuretyApp);

        // console.log();
        // console.log('REGIST');

        // await flightSuretyApp.methods.registerOracle().send({
        //   from: this.oracleAccounts[a],
        //   value: fee,
        //   gas: 4712388,
        //   gasPrice: 100000000000
        // }, callback);
        console.log('\tSuccess');
      } catch (e) {
        console.log("\tOracle registration failed or is already registered");
        console.log(e);

      }

      // let result = await flightSuretyApp.methods.getMyIndexes().call({
      //   from: this.oracleAccounts[a]
      // });
      // console.log(`Oracle Registered: ${result[0]}, ${result[1]}, ${result[2]}`);

    }
  };

  async showRegisteredOracles() {
    for (let a = 0; a < this.oracleAccounts.length; a++) {
      try {
        console.log(this.oracleAccounts[0]);
        let result = await this.flightSuretyApp.methods.getMyIndexes().call({
          from: this.oracleAccounts[0]
        });
        console.log(`Oracle Registered: ${result[0]}, ${result[1]}, ${result[2]}`);
      } catch (e) {
        console.log("Cannot show indexes");
      }
    }
    return result;
  }

  async simulateOracles(address, flight, timestamp) {

    for (let a = 0; a < this.oracleAccounts.length; a++) {

      let oracleIndexes = await this.flightSuretyApp.methods.getMyIndexes().call({
        from: this.oracleAccounts[a]
      });
      for (let idx = 0; idx < 3; idx++) {
        try {
          // Submit a response...it will only be accepted if there is an Index match
          await this.flightSuretyApp.methods.submitOracleResponse(oracleIndexes[idx], address, flight, timestamp, STATUS_CODE_LATE_AIRLINE).send({
            from: this.oracleAccounts[a]
          });
          console.log('\nSuccess', idx, oracleIndexes[idx], flight, timestamp);
        } catch (e) {
          console.log('\nError', idx, oracleIndexes[idx], flight, timestamp);
        }
      }
    }
  }

}

let oracleHandler = new OracleHandler();
oracleHandler.registerOracles();


flightSuretyApp.events.OracleRequest({
  fromBlock: 0
}, function (error, event) {

  if (error) console.log(error)

  console.log("Oracle event triggered", event);
  console.log("airline:", event.returnValues.airline);
  console.log("timestamp:", event.returnValues.timestamp);
  console.log("flight:", event.returnValues.flight);
  let airline = event.returnValues.airline;
  let flight = event.returnValues.flight;
  let timestamp = event.returnValues.timestamp;

  oracleHandler.simulateOracles(airline, flight, timestamp);

});

const app = express();
app.get('/api', (req, res) => {

  res.send({
    message: 'An API for use with your Dapp!'
  })
})

export default app;