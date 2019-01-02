var StarNotary = artifacts.require('./starNotaryV1.sol')

module.exports = function (deployer) {
  deployer.deploy(StarNotary)
}
