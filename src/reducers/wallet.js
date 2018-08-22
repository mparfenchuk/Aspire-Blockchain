import * as constants from '../constants/actionTypes';

const initialState = {
    init: false,
    keystore: [],
    seed:'',
    address:''
}

const walletReducer = (state = initialState, action) => {
    switch (action.type) {
    case constants.WALLET_CREATED:{
        return {
            init: true,
            keystore: action.data.keystore,
            seed: action.data.seed,
            address: action.data.address
        }
    }
    default:
        return state;
    }
}
    
export default walletReducer