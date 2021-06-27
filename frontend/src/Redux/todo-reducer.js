import {todoAPI} from "../api/todo-api";

const START_FETCHING = 'START_FETCHING'
const END_FETCHING = 'END_FETCHING'
const START_UPDATING = 'START_UPDATING'
const END_UPDATING = 'END_UPDATING'
const GET_TODO_SUCCESS = 'GET_TODO_SUCCESS'
const GET_TODO_FAIL = 'GET_TODO_FAIL'
const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS'
const GET_TASKS_FAIL = 'GET_TASKS_FAIL'
const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS'
const UPDATE_TASK_FAIL = 'UPDATE_TASK_FAIL'
const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS'
const DELETE_TASK_FAIL = 'DELETE_TASK_FAIL'
const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS'
const CREATE_TASK_FAIL = 'CREATE_TASK_FAIL'

const initialState = {
    todo: null,
    isFetching: true,
    isUpdating: false
}

export const todoReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case START_FETCHING: {
            return {...state, isFetching: true}
        }
        case END_FETCHING: {
            return {...state, isFetching: false}
        }
        case START_UPDATING: {
            return {...state, isUpdating: true}
        }
        case END_UPDATING: {
            return {...state, isUpdating: false}
        }
        case GET_TODO_SUCCESS: {
            return {...state, todo: {...payload}, error: 0}
        }
        case GET_TODO_FAIL: {
            return {...state, todo: null}
        }
        case GET_TASKS_SUCCESS: {
            return {...state, todo: {...state.todo, tasks: [...payload]}}
        }
        case GET_TASKS_FAIL: {
            return {...state, todo: {...state.todo, todo: null}}
        }
        case CREATE_TASK_SUCCESS: {
            return {...state, todo: {...state.todo, tasks: [...payload]}}
        }
        case UPDATE_TASK_SUCCESS: {
            return {...state, todo: {...state.todo, tasks: [...payload]}}
        }
        case DELETE_TASK_SUCCESS: {
            return {...state, todo: {...state.todo, tasks: [...payload]}}
        }
        default: {
            return state
        }
    }
}

const startFetching = () => {
    return {
        type: START_FETCHING
    }
}
const endFetching = () => {
    return {
        type: END_FETCHING
    }
}

const getTodoSuccess = (payload) => {
    return {
        type: GET_TODO_SUCCESS,
        payload
    }
}

export const getTodo = () => async (dispatch) => {
    try {
        dispatch(startFetching())
        const response = await todoAPI.getTodo()
        dispatch(getTodoSuccess(response))
        dispatch(endFetching())
    } catch (err) {
        dispatch(endFetching())
    }
}

const startUpdating = () => {
    return {
        type: START_UPDATING
    }
}
const endUpdating = () => {
    return {
        type: END_UPDATING
    }
}

const updateTaskSuccess = (payload) => {
    return {
        type: UPDATE_TASK_SUCCESS,
        payload
    }
}

export const updateTask = (task) => async (dispatch) => {
    try {
        dispatch(startUpdating())
        const response = await todoAPI.updateTask(task)
        dispatch(updateTaskSuccess(response))
        dispatch(endUpdating())
    } catch (err) {

    }
}

const createTaskSuccess = (payload) => {
    return {
        type: CREATE_TASK_SUCCESS,
        payload
    }
}

export const createTask = (task) => async (dispatch) => {
    try {
        dispatch(startUpdating())
        const response = await todoAPI.createTask(task)
        dispatch(createTaskSuccess(response))
        dispatch(endUpdating())
    } catch (err) {

    }
}

const deleteTaskSuccess = (payload) => {
    return {
        type: UPDATE_TASK_SUCCESS,
        payload
    }
}

export const deleteTask = (taskId) => async (dispatch) => {
    try {
        dispatch(startUpdating())
        const response = await todoAPI.deleteTask(taskId)
        dispatch(deleteTaskSuccess(response))
        dispatch(endUpdating())
    } catch (err) {

    }
}