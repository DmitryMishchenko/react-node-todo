import {
    FETCH_TODO_LIST,
    REMOVE_TODO_ITEM,
    CREATE_NEW_TODO,
    FETCH_TODO_BY_ID,
    UPDATE_TODO_BY_ID
} from '../constants/actionTypes';
import {STATUS_SUCCESS, STATUS_CREATED_SUCCESSFULLY} from '../constants/httpStatuses';
import api from '../api';
import transformArrayIntoObject from '../helpers/transformArrayIntoObject';

export const loadTodoListRequest = (payload) => ({
    type: FETCH_TODO_LIST,
    payload
});

export const removeTodoRequest = (payload) => ({
    type: REMOVE_TODO_ITEM,
    payload
});

export const createTodoRequest = (payload) => ({
    type: CREATE_NEW_TODO,
    payload
});

export const loadTodoRequest = (payload) => ({
    type: FETCH_TODO_BY_ID,
    payload
});

export const updateTodoRequest = (payload) => ({
    type: UPDATE_TODO_BY_ID,
    payload
});

export const loadTodoList = () => (dispatch) => (
    api.get('api/todo').then(res => {
        const success = res.status === STATUS_SUCCESS;

        if (success) {
            const normalizedData = transformArrayIntoObject(res.data, '_id');
            dispatch(loadTodoListRequest(normalizedData));
        }

        return {success};
    })
);

export const removeTodo = (id) => (dispatch) => (
    api.delete(`api/todo/${id}`).then(res => {
        const success = res.status === STATUS_SUCCESS;

        if (success) {
            dispatch(removeTodoRequest(id));
        }

        return {success};
    })
);

export const createTodo = (data) => (dispatch) => (
    api.post('api/todo', data).then(res => {
        const success = res.status === STATUS_CREATED_SUCCESSFULLY;

        if (success) {
            dispatch(createTodoRequest(res.data));
        }

        return {success};
    })
);

export const loadTodo = (id) => (dispatch) => (
    api.get(`api/todo/${id}`).then(res => {
        const success = res.status === STATUS_SUCCESS;

        if (success) {
            dispatch(loadTodoRequest(res.data));
        }

        return {success};
    })
);

export const updateTodo = (id, data) => (dispatch) => (
    api.put(`api/todo/${id}`, data).then(res => {
        const success = res.status === STATUS_SUCCESS;

        if (success) {
            dispatch(updateTodoRequest(res.data));
        }

        return {success};
    })
);