const FlightSuretyApp = artifacts.require("FlightSuretyApp");
const AirlineData = artifacts.require("AirlineData");
const FlightData = artifacts.require("FlightData");
const fs = require('fs');

module.exports = function(deployer) {

    let firstAirline = '0xf17f52151EbEF6C7334FAD080c5704D77216b732';
    deployer.deploy(FlightData).then(() =>
    deployer.deploy(AirlineData, 'Genesis Air', firstAirline)
    .then(() => {
        return deployer.deploy(FlightSuretyApp, AirlineData.address, FlightData.address)
                .then(() => {
                    let config = {
                        localhost: {
                            url: 'http://localhost:8545',
                            airlineDataAddress: AirlineData.address,
                            flightDataAddress: FlightData.address,
                            appAddress: FlightSuretyApp.address
                        }
                    }
                    fs.writeFileSync(__dirname + '/../src/dapp/config.json',JSON.stringify(config, null, '\t'), 'utf-8');
                    fs.writeFileSync(__dirname + '/../src/server/config.json',JSON.stringify(config, null, '\t'), 'utf-8');
                });
    })
    );
}