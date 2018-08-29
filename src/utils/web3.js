import Web3 from 'web3'

const ZeroClientProvider = require('web3-provider-engine/zero.js')

const providerEngine = ZeroClientProvider({
    rpcUrl: 'https://ropsten.infura.io/cWROvF4DmYYVP2bWfvZO',
})
  
export const web3 = new Web3(providerEngine);