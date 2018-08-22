import * as constants from '../constants/actionTypes';

const initialState = {
    page: "create"
}

const mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
    case constants.CHANGE_TO_RESTORE:{
        return {
            page: "restore"
        }
    }
    case constants.CHANGE_TO_CREATE:{
        return initialState;
    }
    default:
        return state;
    }
}
    
export default mainPageReducer