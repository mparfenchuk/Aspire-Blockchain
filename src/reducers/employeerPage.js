import * as constants from '../constants/actionTypes';

const initialState = {
    employeerError: "",
    page: "all",
    candidate: "",
    employeerClaimHash: "",
    claims: [],
    candidates: [],
    isVerifier: true
}

const employeerPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.SHOW_CANDIDATE_TO_EMPLOYEER:{
            return {
                ...state,
                page: "candidate",
                candidate: action.candidate
            }
        }
        case constants.SHOW_ALL_TO_EMPLOYEER:{
            return {
                ...state,
                page: "all",
                candidate: "",
                validateClaimHash: "",
                claims:[],
                isVerifier: true
            }
        }
        case constants.SET_EMPLOYEER_DATA:{
            return {
                ...state,
                candidates: action.data.candidates
            }
        }
        case constants.SET_EMPLOYEER_LOADING:{
            return {
                ...state,
                employeerError: "",
                candidates: [],
                employeerClaimHash: "",
                claims:[],
                isVerifier: true
            }
        }
        case constants.SET_EMPLOYEER_ERROR:{
            return {
                ...state,
                candidates: [],
                employeerClaimHash: "",
                claims:[],
                isVerifier: true,
                employeerError: action.error
            }
        }
        case constants.SET_EMPLOYEER_CLAIMS: {
            return {
                ...state,
                claims: action.data.claims,
                isVerifier: action.data.isVerifier
            }
        }
        case constants.SET_EMPLOYEER_CLAIM_HASH:{
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
    
export default employeerPageReducer