import { useDispatch } from 'react-redux';
import {
	UPDATE_USER,
	CHANGE_BRANCH,
	CHANGE_EMIRATE,
	CHANGE_FULLADDRESS,
	CHANGE_REGION
} from './actionTypes';

const dispatchers = () => {

	const dispatch = useDispatch()
	return {
		updateUser: (data) => dispatch({ type: UPDATE_USER, data: data }),
		changeBranch: (branch) => dispatch({ type: CHANGE_BRANCH, data: branch }),
		changeRegion: (region) => dispatch({ type: CHANGE_REGION, data: region }),
		changeFullAddress: address => dispatch({ type: CHANGE_FULLADDRESS, data: address }),
		changeEmirate: emirate => dispatch({ type: CHANGE_EMIRATE, data: emirate }),
	}
	
}

export default dispatchers;