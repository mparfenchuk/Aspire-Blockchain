import { put, all, take, cps } from "redux-saga/effects";
import { startSubmit, stopSubmit, reset } from 'redux-form'
import lightwallet from 'eth-lightwallet'
import * as constants from '../constants/actionTypes';
//import { push } from 'connected-react-router'

export function* rootSaga() {
    yield all([
        createWalletFlow()
    ])
}

function* createWalletFlow() {
    while (true) {

        let { seed, password, formId } = yield take(constants.CREATE_WALLET);

        yield put(startSubmit(formId))

        const { ks, err } = yield cps(cb => lightwallet.keystore.createVault({password: password, seedPhrase: seed, hdPathString: "m/44'/60'/0'/0"}, (err, ks) => cb(null, { err, ks })))
        if (ks) {
            const { pwDerivedKey, errDK } = yield cps(cb => ks.keyFromPassword(password, (errDK, pwDerivedKey) => cb(null, { errDK, pwDerivedKey })));
            if (pwDerivedKey) {
                ks.generateNewAddress(pwDerivedKey);
            
                let addresses = ks.getAddresses();
                let keystore = ks.serialize();
        
                yield put(reset(formId))
                yield put(stopSubmit(formId))
                yield put({type: constants.WALLET_CREATED, data: { "address": addresses[0], "seed": seed, "keystore": keystore }})
            } else {
                yield put(stopSubmit(formId, { _error: errDK.message }))  
            }      
        } else {
            yield put(stopSubmit(formId, { _error: err.message }))  
        }
    }
}