const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

let initialState = {
	currentUser: null,
	isAuth: false,
};

const auth = (state = initialState, action) => {
	let stateCopy;

	switch (action.type) {
		case SET_AUTH_USER_DATA:
			stateCopy = { ...state, ...action.data, isAuth: true };
			return stateCopy;

		default:
			return state;
	}
};

export const setAuthUserDataAC = (userId, email, login) => ({
	type: SET_AUTH_USER_DATA,
	data: { userId, email, login },
});

export const getAuthUserData = () => {
	return (dispatch) => {};
};

export default auth;
