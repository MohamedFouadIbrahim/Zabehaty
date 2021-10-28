import {
	UPDATE_USER,
	UPDATE_CART_NOTIFY_MESSAGE,
	OPEN_NOTIFICATION_PAGE,
	NOTIFICATION_DATA
} from '../actionTypes';

const INITIAL_STATE = {
	user: {},
	currentAddress: {},
	showCartMessageNotify: false,
	openNotificationsPage: false,
	pushNotificationData: undefined
};

export const sessionReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_USER:
			return {
				...state,
				user: action.data
			}
		case UPDATE_CART_NOTIFY_MESSAGE:
			return {
				...state,
				showCartMessageNotify: action.status
			}
		case OPEN_NOTIFICATION_PAGE:
			return {
				...state,
				openNotificationsPage: action.status
			}
		case NOTIFICATION_DATA:
			return {
				...state,
				pushNotificationData: action.data
			}
		default:
			break;
	}

	return state
};
