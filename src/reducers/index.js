import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import walletReducer from './wallet'
import mainPageReducer from './mainPage'
import validatorPageReducer from './validatorPage'
import employeerPageReducer from './employeerPage'

const reducer = combineReducers({
    form: formReducer,
    wallet: walletReducer,
    mainPageType: mainPageReducer,
    validatorPageType: validatorPageReducer,
    employeerPageType: employeerPageReducer
})

export default reducer