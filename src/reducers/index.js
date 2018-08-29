import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import walletReducer from './wallet'
import mainPageReducer from './mainPage'
import validatorPageReducer from './validatorPage'
import employeerPageReducer from './employeerPage'
import candidatePageReducer from './candidatePage'

const reducer = combineReducers({
    form: formReducer,
    wallet: walletReducer,
    mainPage: mainPageReducer,
    validatorPage: validatorPageReducer,
    employeerPage: employeerPageReducer,
    candidatePage: candidatePageReducer
})

export default reducer