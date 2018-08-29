import * as constants from '../constants/actionTypes';

export const createWallet = (type, seed, password, formId) => ({ type: constants.CREATE_WALLET, walletType: type, seed: seed, password: password, formId: formId });

export const changeToRestore = () => ({type: constants.CHANGE_TO_RESTORE});
export const changeToCreate = () => ({type: constants.CHANGE_TO_CREATE});
export const logout = () => ({type: constants.LOGOUT});

export const showCandidatesToValidator= () => ({type: constants.SHOW_ALL_TO_VALIDATOR});
export const showCandidateToValidator = (candidate) => ({type: constants.SHOW_CANDIDATE_TO_VALIDATOR, candidate: candidate});

export const showCandidatesToEmployeer = () => ({type: constants.SHOW_ALL_TO_EMPLOYEER});
export const showCandidateToEmployeer = (candidate) => ({type: constants.SHOW_CANDIDATE_TO_EMPLOYEER, candidate: candidate});

export const setCandidateData = (counter) => ({type: constants.GET_CANDIDATE_DATA, counter: counter});

export const setValidatorData = (counter) => ({type: constants.GET_VALIDATOR_DATA, counter: counter});
export const setValidatorClaims = (counter, address) => ({type: constants.GET_VALIDATOR_CLAIMS, counter: counter, address: address});

export const setEmployeerData = (counter) => ({type: constants.GET_EMPLOYEER_DATA, counter: counter});
export const setEmployeerClaims = (counter, address) => ({type: constants.GET_EMPLOYEER_CLAIMS, counter: counter, address: address});

export const addClaims = (claims, formId) => ({type: constants.GET_CLAIMS, claims: claims, formId: formId});
export const validateClaim = (claim, candidate, certifier, status, formId) => ({type: constants.VALIDATE_CLAIM, claim: claim, candidate: candidate, certifier: certifier, status: status, formId: formId});
export const verifyCandidate = (candidate) => ({type: constants.VERIFY_CANDIDATE, candidate: candidate});