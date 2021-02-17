import * as types from '../constants/index'

export const listAll = () => {
    return {
        type: types.LIST_ALL,
        
    }
}

export const addTask = (task) => {
    return {
        type: types.SAVE_TASK,
        task
    }
}

export const openForm = (isDisplayFrom) => {
    return {
        type: types.OPEN_FORM,
        isDisplayFrom
    }
}

export const closeForm = (isDisplayFrom) => {
    return {
        type: types.CLOSE_FORM,
        isDisplayFrom
    }
}

export const toggelForm = (isDisplayFrom) => {
    return {
        type: types.TOGGEL_FORM,
        isDisplayFrom
    }
}

export const updateStatusTask = (id) => {
    return {
        type: types.UPDATE_STATUS_TASK,
        id
    }
}

export const deleteTask = id => {
    return {
        type: types.DELETE_TASK,
        id
    }
}

export const updateTask = task => {
    return {
        type: types.UPDATE_TASK,
        task
    }
}

export const filterTable = filter => {
    return {
        type: types.FILTER_TABLE,
        filter
    }
}

export const onSearch = keyWord => {
    return {
        type: types.SEARCH,
        keyWord
    }
}

export const onSort = sortBy => {
    return {
        type: types.SORT,
        sortBy
    }
}