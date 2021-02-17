import * as types from '../constants/index'
import randomstring from 'randomstring'
import {findIndex} from 'lodash'

var data = JSON.parse(localStorage.getItem('stask'));

var initialState = data ? data : [];
var myReducer = (state = initialState, action) => {

    switch(action.type){
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var {task} = action;
            if(typeof task.status === Boolean) {
                task.status = task.status === 'true' ? true : false;
            }
            console.log(task);
            if(task.id === "") {
                task.id = randomstring.generate();
                state.push(task);
            } else {
                var index = findIndex(state, item => {
                    return item.id === task.id;
                })
                state[index] = task;
            }
            localStorage.setItem('stask', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
            var index = findIndex(state, (item) => {
                return item.id === action.id;
            })
            //state[index].status = !state[index].status;
            state[index] = {
                ...state[index], // cpy task cu
                status: !state[index].status // thay doi status
            }
            localStorage.setItem('stask', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            var index = findIndex(state, (item) => {
                return item.id === action.id;
            })
            state.splice(index, 1);
            localStorage.setItem('stask', JSON.stringify(state));
            return [...state];
        default: return state;
    }
}

export default myReducer;