import { combineReducers } from "redux";
import tasks from './tasks';
import form from './Form';
import editingTask from './editingTask';
import filter from './filter';
import search from './search';
import sort from './sort';

var myReducer = combineReducers({
    tasks,
    form,
    editingTask,
    filter,
    search,
    sort
});

export default myReducer;