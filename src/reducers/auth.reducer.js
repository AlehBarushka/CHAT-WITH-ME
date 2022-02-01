import { authConstant } from '../actions/constatnts';

const initState = {
	userName: '',
	email: '',
	isAuth: false,
	isAuthing: false,
	error: null,
};

const authReducer = (state = initState, action) => {
	console.log(action);
	switch (action.type) {
		case authConstant.USER_LOGIN_REQUEST:
			state = {
				...state,
				isAuthing: true,
			};
			return state;

		case authConstant.USER_LOGIN_SUCCESS:
			state = {
				...state,
				...action.payload.user,
				isAuth: true,
				isAuthing: false,
			};
			return state;

		case authConstant.USER_LOGIN_FAILURE:
			state = {
				...state,
				error: action.payload.error,
				isAuth: false,
				isAuthing: false,
			};
			return state;

		default:
			return state;
	}
};

export default authReducer;
