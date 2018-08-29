const AspireToken = artifacts.require("./AspireToken.sol");
const Verification = artifacts.require("./Verification.sol");

module.exports = function(deployer, network, accounts) {

    const aspireValidation = "0x03ee5E7e2a18D957F8ecaEA4972A35DBAaBe22fB";

    return deployer
        .then(() => {
            return deployer.deploy(AspireToken);
        })
        .then (() => {
            return AspireToken.deployed();
        })
        .then((instance) => {
            return instance.pause();
        })
        .then(() => {
            return deployer.deploy(Verification, AspireToken.address, aspireValidation);
        })
        .then (() => {
            return AspireToken.deployed();
        })
        .then((instance) => {
            return instance.transferOwnership(Verification.address);
        });
       
}