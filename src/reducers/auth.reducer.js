import { authConstants } from '../actions/constatnts';

const initState = {
	userName: '',
	uid: '',
	email: '',
	isAuth: false,
	isAuthing: false,
	error: null,
};

const authReducer = (state = initState, action) => {
	console.log(action);
	switch (action.type) {
		case authConstants.USER_LOGIN_REQUEST:
			state = {
				...state,
				isAuthing: true,
			};
			return state;

		case authConstants.USER_LOGIN_SUCCESS:
			state = {
				...state,
				...action.payload.user,
				isAuth: true,
				isAuthing: false,
			};
			return state;

		case authConstants.USER_LOGIN_FAILURE:
			state = {
				...state,
				error: action.payload.error,
				isAuth: false,
				isAuthing: false,
			};
			return state;

		case authConstants.USER_LOGOUT_REQUEST:
			return state;

		case authConstants.USER_LOGOUT_SUCCESS:
			state = {
				...state,
				userName: '',
				email: '',
				uid: '',
			};
			return state;

		case authConstants.USER_LOGOUT_FAILURE:
			state = {
				...state,
				error: action.payload.error,
			};
			return state;

		default:
			return state;
	}
};

export default authReducer;
