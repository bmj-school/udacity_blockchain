var ConvertLib = artifacts.require('./ConvertLib.sol')
var MetaCoin = artifacts.require('./MetaCoin.sol')
var StarNotary = artifacts.require('./StarNotary.sol')

module.exports = function (deployer) {
 deployer.deploy(StarNotary);
  deployer.deploy(ConvertLib)
  deployer.link(ConvertLib, MetaCoin)
  deployer.deploy(MetaCoin)
}
