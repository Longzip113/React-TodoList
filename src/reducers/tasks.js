import * as types from '../constants/index'

var data = JSON.parse(localStorage.getItem('stask'));

var initialState = data ? data : [];
var myReducer = (state = initialState, action) => {

    switch(action.type){
        case types.LIST_ALL:
            return state;
        default: return state;
    }
}

export default myReducer;