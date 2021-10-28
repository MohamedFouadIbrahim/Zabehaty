import { combineReducers } from 'redux';
import { sessionReducer } from './sessionReducer';
import { skipAuthReducer } from './skipAuth';
import { addressReducer } from './addressReducer';

export default combineReducers({
	session: sessionReducer,
	skipAuth: skipAuthReducer,
	address: addressReducer
});