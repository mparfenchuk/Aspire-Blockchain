import * as constants from '../constants/actionTypes';

const initialState = {
    init: (localStorage.getItem("init") === null) ? false : true,
    keystore: (localStorage.getItem("keystore") === null) ? "" : localStorage.getItem("keystore"),
    seed: (localStorage.getItem("seed") === null) ? "" : localStorage.getItem("seed"),
    address: (localStorage.getItem("address") === null) ? "" : localStorage.getItem("address")
}

const walletReducer = (state = initialState, action) => {
    switch (action.type) {
    case constants.WALLET_CREATED:{

        localStorage.setItem('init', true);
        localStorage.setItem('keystore', action.data.keystore);
        localStorage.setItem('seed', action.data.seed);
        localStorage.setItem('address', action.data.address);

        return {
            init: true,
            keystore: action.data.keystore,
            seed: action.data.seed,
            address: action.data.address
        }
    }
    case constants.LOGOUT:{

        localStorage.clear();
        
        return {
            init: false,
            keystore: "",
            seed: "",
            address: ""
        }
    }
    default:
        return state;
    }
}
    
export default walletReducer