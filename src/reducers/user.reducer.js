import { userConstants } from '../actions/constatnts';

const initState = {
	users: [],
};

const userReducer = (state = initState, action) => {
	console.log(action);
	switch (action.type) {
		case userConstants.GET_REALTIME_USERS_REQUEST:
			return state;
		case userConstants.GET_REALTIME_USERS_SUCCESS:
			state = {
				...state,
				users: action.payload.users,
			};
			return state;
		default:
			return state;
	}
};

export default userReducer;
