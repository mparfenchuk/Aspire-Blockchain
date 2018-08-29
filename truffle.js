var HDWalletProvider = require("truffle-hdwallet-provider")
var mnemonic = "accuse spend leave video feature satoshi fence dizzy bench mix emotion guess"

module.exports = {
   networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" 
    }, 
	  ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/cWROvF4DmYYVP2bWfvZO")
      },
      network_id: 3,
	    gas: 4700000
    } 
  }
};
