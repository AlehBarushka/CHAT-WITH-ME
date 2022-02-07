import { userConstants } from '../actions/constatnts';

const initState = {
	messages: [],
	users: [],
};

const conversationsReducer = (state = initState, action) => {
	switch (action.type) {
		case userConstants.GET_REALTIME_USERS_REQUEST:
			return state;
		case userConstants.GET_REALTIME_USERS_SUCCESS:
			state = {
				...state,
				users: action.payload.users,
			};
			return state;
		case userConstants.GET_REALTIME_MESSAGES_REQUEST:
			return state;

		case userConstants.GET_REALTIME_MESSAGES_SUCCESS:
			state = {
				...state,
				messages: action.payload.conversations,
			};
			return state;

		default:
			return state;
	}
};

export default conversationsReducer;
