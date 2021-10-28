import {
    SKIP_AUTH
} from '../actionTypes';

const INITIAL_STATE = {
    skipAuth: false
};

export const skipAuthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SKIP_AUTH:
            return {
                ...state,
                skipAuth: action.data
            }
        default:
            break;
    }

    return state
};