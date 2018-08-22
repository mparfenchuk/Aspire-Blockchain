import * as constants from '../constants/actionTypes';

export const createWallet = (seed, password, formId) => ({ type: constants.CREATE_WALLET, seed: seed, password: password, formId: formId });
export const changeToRestore = () => ({type: constants.CHANGE_TO_RESTORE});
export const changeToCreate = () => ({type: constants.CHANGE_TO_CREATE});