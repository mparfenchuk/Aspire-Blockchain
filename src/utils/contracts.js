import Verification from '../../build/contracts/Verification.json'
import AspireToken from '../../build/contracts/AspireToken.json'

const contract = require('truffle-contract')

export const VerificationContractAbi = Verification.abi;
export const AspireTokenAbi = AspireToken.abi;

export const VerificationContract = contract(Verification);
export const AspireTokenContract = contract(AspireToken);