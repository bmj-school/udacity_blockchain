var myToken = artifacts.require("./sampleToken.sol");
module.exports = function(deployer) {
deployer.deploy(myToken);
};