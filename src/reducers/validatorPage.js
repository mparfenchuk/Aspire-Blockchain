import * as constants from '../constants/actionTypes';

const initialState = {
    page: "all",
    candidate: ""
}

const validatorPageReducer = (state = initialState, action) => {
    switch (action.type) {
    case constants.SHOW_CANDIDATE_TO_VALIDATOR:{
        return {
            page: "candidate",
            candidate: action.candidate
        }
    }
    case constants.SHOW_ALL_TO_VALIDATOR:{
        return initialState;
    }
    default:
        return state;
    }
}
    
export default validatorPageReducer