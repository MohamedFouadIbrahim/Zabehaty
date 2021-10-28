import {
    CHANGE_BRANCH,
    CHANGE_REGION,
    CHANGE_FULLADDRESS,
    CHANGE_EMIRATE
} from '../actionTypes';

const INITIAL_STATE = {
    currentBranch: {},
    currentAddress: {},
    currentEmirate: {},
    currentRegion: {}
};

export const addressReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_BRANCH:
            return {
                ...state,
                currentBranch: action.data
            }
        case CHANGE_FULLADDRESS:
            return {
                ...state,
                currentAddress: action.data
            }
        case CHANGE_EMIRATE:
            return {
                ...state,
                currentEmirate: action.data
            }
        case CHANGE_REGION:
            return {
                ...state,
                currentRegion: action.data
            }
        default:
            break;
    }

    return state
};