import * as types from '../constants/index'

var initialState = {
    id: '',
    name: '',
    status: false
};

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.UPDATE_TASK:
            return action.task;
        default:
            return state;
    }
}

export default myReducer;