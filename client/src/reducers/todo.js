import {
    FETCH_TODO_LIST,
    REMOVE_TODO_ITEM,
    CREATE_NEW_TODO,
    FETCH_TODO_BY_ID,
    UPDATE_TODO_BY_ID
} from '../constants/actionTypes';

export const todoList = (state = {}, action = {}) => {
    switch (action.type) {
        case FETCH_TODO_LIST:
            return action.payload;

        case REMOVE_TODO_ITEM:
            return Object.keys(state).reduce((acc, key) => {
                if (key !== action.payload) {
                    acc[key] = state[key]
                }

                return acc;
            }, {});

        case CREATE_NEW_TODO:
            return {
                ...state,
                [action.payload._id]: action.payload
            };

        case UPDATE_TODO_BY_ID:
            return {
                ...state,
                [action.payload._id]: action.payload
            };

        default:
            return state;
    }
};

export const todo = (state = {}, action = {}) => {
    switch (action.type) {
        case FETCH_TODO_BY_ID:
            return action.payload;
        default:
            return state;
    }
};