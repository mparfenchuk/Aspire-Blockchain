import * as constants from '../constants/actionTypes';

const initialState = {
    candidateEthBalance: "N/N",
    candidateTokenBalance: "N/N",
    candidateError: "",
    addClaimsHash: "",
    claims: []
}

const candidatePageReducer = (state = initialState, action) => {
    switch (action.type) {
    case constants.SET_CANDIDATE_DATA:{
        return {
            ...state,
            candidateEthBalance: action.data.ethBalance,
            candidateTokenBalance: action.data.tokenBalance,
            claims: action.data.claims
        }
    }
    case constants.SET_CANDIDATE_LOADING:{
        return {
            ...state,
            candidateError: "",
            candidateEthBalance: "Loading...",
            candidateTokenBalance: "Loading...",
            addClaimsHash: "",
            claims: []
        }
    }
    case constants.SET_CANDIDATE_ERROR:{
        return {
            ...state,
            candidateEthBalance: "N/N",
            candidateTokenBalance: "N/N",
            addClaimsHash: "",
            claims: [],
            candidateError: action.error
        }
    }
    case constants.SET_CLAIMS_HASH:{
        return {
            ...state,
            addClaimsHash: action.hash
        }
    }
    case constants.LOGOUT:{
        return initialState;
    }
    default:
        return state;
    }
}
    
export default candidatePageReducer