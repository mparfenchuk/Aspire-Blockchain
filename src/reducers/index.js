import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import walletReducer from './wallet'
import mainPageReducer from './mainPage'

const reducer = combineReducers({
    form: formReducer,
    wallet: walletReducer,
    mainPageType: mainPageReducer
})

export default reducer