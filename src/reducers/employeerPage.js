import * as constants from '../constants/actionTypes';

const initialState = {
    page: "all",
    candidate: ""
}

const employeerPageReducer = (state = initialState, action) => {
    switch (action.type) {
    case constants.SHOW_CANDIDATE_TO_EMPLOYEER:{
        return {
            page: "candidate",
            candidate: action.candidate
        }
    }
    case constants.SHOW_ALL_TO_EMPLOYEER:{
        return initialState;
    }
    default:
        return state;
    }
}
    
export default employeerPageReducer