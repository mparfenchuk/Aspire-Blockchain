import * as constants from '../constants/actionTypes';

const initialState = {
    validatorAddress: "N/N",
    validatorEthBalance: "N/N",
    validatorTokenBalance: "N/N",
    validatorError: "",
    page: "all",
    candidate: "",
    validateClaimHash: "",
    claims: [],
    candidates: []
}

const validatorPageReducer = (state = initialState, action) => {
    switch (action.type) {
    case constants.SHOW_CANDIDATE_TO_VALIDATOR:{
        return {
            ...state,
            page: "candidate",
            candidate: action.candidate
        }
    }
    case constants.SHOW_ALL_TO_VALIDATOR:{
        return {
            ...state,
            page: "all",
            candidate: "",
            validateClaimHash: "",
            claims:[],
        }
    }
    case constants.SET_VALIDATOR_DATA:{
        return {
            ...state,
            validatorAddress: action.data.address,
            validatorEthBalance: action.data.ethBalance,
            validatorTokenBalance: action.data.tokenBalance,
            candidates: action.data.candidates
        }
    }
    case constants.SET_VALIDATOR_LOADING:{
        return {
            ...state,
            validatorError: "",
            validatorAddress: "Loading...",
            validatorEthBalance: "Loading...",
            validatorTokenBalance: "Loading...",
            candidates: [],
            validateClaimHash: "",
            claims:[]
        }
    }
    case constants.SET_VALIDATOR_ERROR:{
        return {
            ...state,
            validatorAddress: "N/N",
            validatorEthBalance: "N/N",
            validatorTokenBalance: "N/N",
            candidates: [],
            validateClaimHash: "",
            claims:[],
            validatorError: action.error
        }
    }
    case constants.SET_VALIDATOR_CLAIMS: {
        return {
            ...state,
            claims: action.data.claims
        }
    }
    case constants.SET_VALIDATED_CLAIM_HASH:{
        return {
            ...state,
            validateClaimHash: action.hash
        }
    }
    case constants.LOGOUT:{
        return initialState;
    }
    default:
        return state;
    }
}
    
export default validatorPageReducer