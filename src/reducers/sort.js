import * as types from '../constants/index'

var initialState = {
    name: '',
    value: -1
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SORT:
            return action.sortBy;
        default:
            return state;
    }
}

export default myReducer;