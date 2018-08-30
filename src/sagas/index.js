import { call, put, all, take, select } from "redux-saga/effects";
import { startSubmit, stopSubmit, reset } from 'redux-form'
import axios from "axios";
import lightwallet from 'eth-lightwallet'
import * as constants from '../constants/actionTypes';
//import { push } from 'connected-react-router'
import { web3 } from '../utils/web3'
import { VerificationContract, VerificationContractAbi, AspireTokenContract } from '../utils/contracts'

export function* rootSaga() {
    yield all([
        createWalletFlow(),
        candidateDataFlow(),
        validatorDataFlow(),
        employeerDataFlow(),
        addClaimsFlow(),
        validatorClaimsFlow(),
        validateClaimFlow(),
        employeerClaimsFlow(),
        verifyCandidateFlow(),
    ])
}

function* verifyCandidateFlow() {
    while (true) {

        const getGasPricePromise = () => {
            return new Promise((resolve, reject) => {
                web3.eth.getGasPrice((err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        const getTransactionCountPromise = (param) => {
            return new Promise((resolve, reject) => {
                web3.eth.getTransactionCount(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        const createVaultPromise = (param) => {
            return new Promise((resolve, reject) => {
                lightwallet.keystore.createVault(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        const keyFromPasswordPromise = (ks, param) => {
            return new Promise((resolve, reject) => {
                ks.keyFromPassword(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        const sendRawTransactionPromise = (param) => {
            return new Promise((resolve, reject) => {
                web3.eth.sendRawTransaction(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        let { candidate } = yield take(constants.VERIFY_CANDIDATE);

        let password = "aspirerecruitment";
        let seed = "accuse spend leave video feature satoshi fence dizzy bench mix emotion guess";

        try {

            const ks = yield call(createVaultPromise, {password: password, seedPhrase: seed, hdPathString: "m/44'/60'/0'/0"});
            const pwDerivedKey = yield call(keyFromPasswordPromise, ks, password);
            ks.generateNewAddress(pwDerivedKey);
                
            let addresses = ks.getAddresses();
            let address = addresses[0];
            VerificationContract.setProvider(web3.currentProvider)
 
            let contractVerificationInstance = yield call(VerificationContract.deployed);

            let gasPrice = yield call(getGasPricePromise);
            let gasPriceHex =  web3.toHex(gasPrice);
            let gasLimitHex =  web3.toHex('1000000');

            let transactionCount = yield call(getTransactionCountPromise, address);
            let transactionCountHex = web3.toHex(transactionCount);

            let rawTx = {
                nonce: transactionCountHex,
                gasPrice: gasPriceHex,
                gasLimit: gasLimitHex,
                to: contractVerificationInstance.address,
                from: address,
                value: web3.toHex('0'),
                chainId: web3.toHex('3')
            }

            let claimTx = lightwallet.txutils.functionTx(VerificationContractAbi, 'verify', [candidate,"123"], rawTx);
            let signedTx = lightwallet.signing.signTx(ks, pwDerivedKey, claimTx, address);

            let transactionHash = yield call(sendRawTransactionPromise, "0x" + signedTx);

            yield put({type: constants.SET_EMPLOYEER_CLAIM_HASH, hash: transactionHash})
        } catch (error) {
            yield put({type: constants.SET_EMPLOYEER_ERROR, error: error.message })
        }
    }
}
function* validateClaimFlow() {
    while (true) {

        const getGasPricePromise = () => {
            return new Promise((resolve, reject) => {
                web3.eth.getGasPrice((err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        const getTransactionCountPromise = (param) => {
            return new Promise((resolve, reject) => {
                web3.eth.getTransactionCount(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        const createVaultPromise = (param) => {
            return new Promise((resolve, reject) => {
                lightwallet.keystore.createVault(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        const keyFromPasswordPromise = (ks, param) => {
            return new Promise((resolve, reject) => {
                ks.keyFromPassword(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        const sendRawTransactionPromise = (param) => {
            return new Promise((resolve, reject) => {
                web3.eth.sendRawTransaction(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        let { claim, candidate, certifier, status, formId } = yield take(constants.VALIDATE_CLAIM);
        
        let password = "aspirevalidation";
        let seed = "mystery dolphin lumber kiwi gallery old isolate scale begin glory barrel coin";

        yield put(startSubmit(formId));

        try {

            const ks = yield call(createVaultPromise, {password: password, seedPhrase: seed, hdPathString: "m/44'/60'/0'/0"});
            const pwDerivedKey = yield call(keyFromPasswordPromise, ks, password);
            ks.generateNewAddress(pwDerivedKey);
                
            let addresses = ks.getAddresses();
            let address = addresses[0];

            VerificationContract.setProvider(web3.currentProvider)
 
            let contractVerificationInstance = yield call(VerificationContract.deployed);

            let gasPrice = yield call(getGasPricePromise);
            let gasPriceHex =  web3.toHex(gasPrice);
            let gasLimitHex =  web3.toHex('1000000');

            let transactionCount = yield call(getTransactionCountPromise, address);
            let transactionCountHex = web3.toHex(transactionCount);

            let rawTx = {
                nonce: transactionCountHex,
                gasPrice: gasPriceHex,
                gasLimit: gasLimitHex,
                to: contractVerificationInstance.address,
                from: address,
                value: web3.toHex('0'),
                chainId: web3.toHex('3')
            }

            let isTrueSet = (status === 'true');
            let claimTx = lightwallet.txutils.functionTx(VerificationContractAbi, 'validate', [candidate,certifier,claim,isTrueSet], rawTx);
            let signedTx = lightwallet.signing.signTx(ks, pwDerivedKey, claimTx, address);

            let transactionHash = yield call(sendRawTransactionPromise, "0x" + signedTx);

            yield put(reset(formId))
            yield put(stopSubmit(formId))
            yield put({type: constants.SET_VALIDATED_CLAIM_HASH, hash: transactionHash})
        } catch (error) {
            yield put(stopSubmit(formId, { _error: error.message }))  
        }
    } 
}

function* addClaimsFlow() {
    while (true) {

        const getGasPricePromise = () => {
            return new Promise((resolve, reject) => {
                web3.eth.getGasPrice((err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        const getTransactionCountPromise = (param) => {
            return new Promise((resolve, reject) => {
                web3.eth.getTransactionCount(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        const keyFromPasswordPromise = (ks, param) => {
            return new Promise((resolve, reject) => {
                ks.keyFromPassword(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        const sendRawTransactionPromise = (param) => {
            return new Promise((resolve, reject) => {
                web3.eth.sendRawTransaction(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        let { claims, formId } = yield take(constants.GET_CLAIMS);
        let { address, keystore } = yield select(state => state.wallet);

        yield put(startSubmit(formId));

        try {

            let password = prompt('Enter password to send the transaction', 'Password');
            if (!password){
                throw Error('You should enter a password');
            }

            VerificationContract.setProvider(web3.currentProvider)
 
            let contractVerificationInstance = yield call(VerificationContract.deployed);

            let gasPrice = yield call(getGasPricePromise);
            let gasPriceHex =  web3.toHex(gasPrice);
            let gasLimitHex =  web3.toHex('1000000');

            let transactionCount = yield call(getTransactionCountPromise, address);
            let transactionCountHex = web3.toHex(transactionCount);

            let rawTx = {
                nonce: transactionCountHex,
                gasPrice: gasPriceHex,
                gasLimit: gasLimitHex,
                to: contractVerificationInstance.address,
                from: address,
                value: web3.toHex('0'),
                chainId: web3.toHex('3')
            }

            const ks = lightwallet.keystore.deserialize(keystore);
            const pwDerivedKey = yield call(keyFromPasswordPromise, ks, password);
            
            let claimTx = lightwallet.txutils.functionTx(VerificationContractAbi, 'claim', [claims], rawTx);
            let signedTx = lightwallet.signing.signTx(ks, pwDerivedKey, claimTx, address);
            
            let transactionHash = yield call(sendRawTransactionPromise, "0x" + signedTx);

            yield put(reset(formId))
            yield put(stopSubmit(formId))
            yield put({type: constants.SET_CLAIMS_HASH, hash: transactionHash})
        } catch (error) {
            yield put(stopSubmit(formId, { _error: error.message }))  
        }
    }
}

function* createWalletFlow() {
    while (true) {

        const createVaultPromise = (param) => {
            return new Promise((resolve, reject) => {
                lightwallet.keystore.createVault(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }
        
        const keyFromPasswordPromise = (ks, param) => {
            return new Promise((resolve, reject) => {
                ks.keyFromPassword(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        const checkFaucet = () => {
            return axios({
              method: "get",
              url: "https://m6b19m0fxh.execute-api.eu-west-1.amazonaws.com/dev/status"
            });
        }

        const getSomeEther = (address) => {
            return axios({
              method: "get",
              url: "https://m6b19m0fxh.execute-api.eu-west-1.amazonaws.com/dev/ask?address="+address
            });
        }

        let { walletType, seed, password, formId } = yield take(constants.CREATE_WALLET);

        yield put(startSubmit(formId))

        try {

            const ks = yield call(createVaultPromise, {password: password, seedPhrase: seed, hdPathString: "m/44'/60'/0'/0"});
            const pwDerivedKey = yield call(keyFromPasswordPromise, ks, password);

            ks.generateNewAddress(pwDerivedKey);
                
            let addresses = ks.getAddresses();
            let keystore = ks.serialize();
            
            if (walletType === "create"){
                const faucetInfo = yield call(checkFaucet);
                if(parseFloat(faucetInfo.data.message.ethBalance) > 0.01){
                    yield call(getSomeEther, addresses[0]);
                } else {
                    throw Error('Faucet has no Ether. Contact to admin.');
                }
            }

            yield put(reset(formId))
            yield put(stopSubmit(formId))
            yield put({type: constants.WALLET_CREATED, data: { "address": addresses[0], "seed": seed, "keystore": keystore }})
        } catch (error) {
            yield put(stopSubmit(formId, { _error: error.message }))  
        }
    }
}

function* employeerDataFlow() {
    while (true) {

        let { counter } = yield take(constants.GET_EMPLOYEER_DATA);

        if (counter === 0){
            yield put({type:constants.SET_EMPLOYEER_LOADING});
        }

        try {
            VerificationContract.setProvider(web3.currentProvider)

            let contractVerificationInstance = yield call(VerificationContract.deployed);

            let candidatesAmount = yield call(contractVerificationInstance.getAmountOfCandidates);

            let candidatesData = [];

            for (let i = 0; i < candidatesAmount; i++) {
                let address = yield call(contractVerificationInstance.candidates, i);
                let validated = yield call(contractVerificationInstance.getAmountOfValidatedClaims, address);
                candidatesData.push({address:address,validated:validated.toString()});
            }

            yield put({type: constants.SET_EMPLOYEER_DATA, data: { candidates: candidatesData }})
        } catch (error) {
            yield put({type: constants.SET_EMPLOYEER_ERROR, error: error.message })
        }
    }
}

function* employeerClaimsFlow() {
    while (true) {

        let { counter, address } = yield take(constants.GET_EMPLOYEER_CLAIMS);

        if (counter === 0){
            //yield put({type:constants.SET_VALIDATOR_CLAIMS_LOADING});
        }

        try {
            VerificationContract.setProvider(web3.currentProvider)

            let contractVerificationInstance = yield call(VerificationContract.deployed);

            let validatedClaims = yield call(contractVerificationInstance.getValidatedClaims, address);

            let claimsData = [];

            let isVerifier = yield call(contractVerificationInstance.isVerifier, address, "123", { from: "0xc5468a0576444026c734614cb59f5f173d5e8a6d" });

            if (isVerifier) {
                for (let i = 0; i < validatedClaims.length; i++) {
                    let status = yield call(contractVerificationInstance.getClaimStatusForVerifier, address, validatedClaims[i], "123", { from: "0xc5468a0576444026c734614cb59f5f173d5e8a6d" });
                    let details = yield call(contractVerificationInstance.getClaimDetailsForVerifier, address, validatedClaims[i], "123", { from: "0xc5468a0576444026c734614cb59f5f173d5e8a6d" });
                    claimsData.push({title:web3.toUtf8(validatedClaims[i]),status:status[0].toString(),certifier:status[1],validator:details[0],date:details[1].toString()});
                }
            } else {
                for (let i = 0; i < validatedClaims.length; i++) {
                    claimsData.push({title:web3.toUtf8(validatedClaims[i]),status:"Invisible",certifier:"Invisible",validator:"Invisible",date:"Invisible"});
                }
            } 

            yield put({type: constants.SET_EMPLOYEER_CLAIMS, data: { "claims": claimsData, "isVerifier": isVerifier }})
        } catch (error) {
            yield put({type: constants.SET_EMPLOYEER_ERROR, error: error.message })
            //yield put({type: constants.SET_VALIDATOR_CLAIMS_ERROR, error: error.message })
        }
    }
}

function* validatorDataFlow() {
    while (true) {

        const getEthBalancePromise = (param) => {
            return new Promise((resolve, reject) => {
                web3.eth.getBalance(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        let { counter } = yield take(constants.GET_VALIDATOR_DATA);

        if (counter === 0){
            yield put({type:constants.SET_VALIDATOR_LOADING});
        }

        try {
            VerificationContract.setProvider(web3.currentProvider)
            AspireTokenContract.setProvider(web3.currentProvider);

            let contractVerificationInstance = yield call(VerificationContract.deployed);
            let contractAspireTokenInstance = yield call(AspireTokenContract.deployed);

            let validationAddress = yield call(contractVerificationInstance.aspireValidation);

            let validator = validationAddress.toString();

            let balance = yield call(getEthBalancePromise, validator);
            let ethBalance = web3.fromWei(balance.toString()) 

            let tokenBalance = yield call(contractAspireTokenInstance.balanceOf, validator);

                const BN = require('bn.js');
                const balanceWeiBN = new BN(tokenBalance.toString())

                const decimals = 18
                const decimalsBN = new BN(decimals)
                const divisor = new BN(10).pow(decimalsBN)

                const beforeDecimal = balanceWeiBN.div(divisor)
                const afterDecimal  = balanceWeiBN.mod(divisor)

                let tkBln = (afterDecimal.toString() === "0") ? beforeDecimal :  beforeDecimal+"."+afterDecimal;

            let candidatesAmount = yield call(contractVerificationInstance.getAmountOfCandidates);

            let candidatesData = [];

            for (let i = 0; i < candidatesAmount; i++) {
                let address = yield call(contractVerificationInstance.candidates, i);
                let pending = yield call(contractVerificationInstance.getAmountOfPendingClaims, address);
                candidatesData.push({address:address,pending:pending.toString()});
            }

            yield put({type: constants.SET_VALIDATOR_DATA, data: { "address": validator, "ethBalance": ethBalance + " ETH", "tokenBalance": tkBln + " ASP", candidates: candidatesData }})
        } catch (error) {
            yield put({type: constants.SET_VALIDATOR_ERROR, error: error.message })
        }
    }
}

function* validatorClaimsFlow() {
    while (true) {

        let { counter, address } = yield take(constants.GET_VALIDATOR_CLAIMS);

        if (counter === 0){
            //yield put({type:constants.SET_VALIDATOR_CLAIMS_LOADING});
        }

        try {
            VerificationContract.setProvider(web3.currentProvider)

            let contractVerificationInstance = yield call(VerificationContract.deployed);

            let pendingClaims = yield call(contractVerificationInstance.getPendingClaims, address);

            let claimsData = [];

            for (let i = 0; i < pendingClaims.length; i++) {
                claimsData.push({title:web3.toUtf8(pendingClaims[i])});
            }

            yield put({type: constants.SET_VALIDATOR_CLAIMS, data: { "claims": claimsData }})
        } catch (error) {
            //yield put({type: constants.SET_VALIDATOR_CLAIMS_ERROR, error: error.message })
        }
    }
}

function* candidateDataFlow() {
    while (true) {

        const getEthBalancePromise = (param) => {
            return new Promise((resolve, reject) => {
                web3.eth.getBalance(param, (err, data) => {
                    if (err !== null) return reject(err);
                    return resolve(data);
                });
            });
        }

        let { counter } = yield take(constants.GET_CANDIDATE_DATA);
        let { address } = yield select(state => state.wallet);

        if (counter === 0){
            yield put({type:constants.SET_CANDIDATE_LOADING});
        }

        try {
            VerificationContract.setProvider(web3.currentProvider)
            AspireTokenContract.setProvider(web3.currentProvider);

            let contractVerificationInstance = yield call(VerificationContract.deployed);
            let contractAspireTokenInstance = yield call(AspireTokenContract.deployed);

            let balance = yield call(getEthBalancePromise, address);
            let ethBalance = web3.fromWei(balance.toString());

            let tokenBalance = yield call(contractAspireTokenInstance.balanceOf, address);

                const BN = require('bn.js');
                const balanceWeiBN = new BN(tokenBalance.toString())

                const decimals = 18
                const decimalsBN = new BN(decimals)
                const divisor = new BN(10).pow(decimalsBN)

                const beforeDecimal = balanceWeiBN.div(divisor)
                const afterDecimal  = balanceWeiBN.mod(divisor)

                let tkBln = (afterDecimal.toString() === "0") ? beforeDecimal :  beforeDecimal+"."+afterDecimal;

            let claims = yield call(contractVerificationInstance.getClaims, address);

            let claimsData = [];

            for (let i = 0; i < claims.length; i++) {
                let status = yield call(contractVerificationInstance.getClaimStatusForCandidate, claims[i], { from: address });
                let details = yield call(contractVerificationInstance.getClaimDetailsForCandidate, claims[i], { from: address });
                claimsData.push({title:web3.toUtf8(claims[i]),status:status[0].toString(),certifier:status[1],validator:details[0],date:details[1].toString()});
            }

            yield put({type: constants.SET_CANDIDATE_DATA, data: { "ethBalance": parseFloat(ethBalance) === 0 ? "Waiting for faucet transaction..." : ethBalance + " ETH", "tokenBalance": tkBln + " ASP", claims: claimsData }})
        } catch (error) {
            yield put({type: constants.SET_CANDIDATE_ERROR, error: error.message })
        }
    }
}