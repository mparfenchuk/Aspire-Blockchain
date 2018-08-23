import * as constants from '../constants/actionTypes';

export const createWallet = (seed, password, formId) => ({ type: constants.CREATE_WALLET, seed: seed, password: password, formId: formId });

export const changeToRestore = () => ({type: constants.CHANGE_TO_RESTORE});
export const changeToCreate = () => ({type: constants.CHANGE_TO_CREATE});

export const showCandidatesToValidator= () => ({type: constants.SHOW_ALL_TO_VALIDATOR});
export const showCandidateToValidator = (candidate) => ({type: constants.SHOW_CANDIDATE_TO_VALIDATOR, candidate: candidate});

export const showCandidatesToEmployeer = () => ({type: constants.SHOW_ALL_TO_EMPLOYEER});
export const showCandidateToEmployeer = (candidate) => ({type: constants.SHOW_CANDIDATE_TO_EMPLOYEER, candidate: candidate});