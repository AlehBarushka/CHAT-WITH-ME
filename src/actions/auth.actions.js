import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../service/firebaseConfig';
import { authConstant } from './constatnts';

export const signUp = (user) => {
	return (dispatch) => {
		console.log('sigUP');
		dispatch({ type: authConstant.USER_LOGIN_REQUEST });
		createUserWithEmailAndPassword(auth, user.email, user.password)
			.then((response) => {
				updateProfile(auth.currentUser, { displayName: user.userName });
				addDoc(collection(db, 'users'), {
					userName: user.userName,
					uid: response.user.uid,
					createdAt: new Date(),
				}).then(() => {
					const loggedInUser = {
						userName: user.userName,
						uid: response.user.uid,
						email: user.email,
					};
					// localStorage.setItem('user', JSON.stringify(loggedInUser));
					dispatch({ type: authConstant.USER_LOGIN_SUCCESS, payload: { user: loggedInUser } });
				});
			})
			.catch((error) => {
				dispatch({ type: authConstant.USER_LOGIN_FAILURE, payload: { error: error.message } });
			});
	};
};

export const signIn = (user) => {
	return (dispatch) => {
		console.log('sigIn');
		dispatch({ type: authConstant.USER_LOGIN_REQUEST });
		signInWithEmailAndPassword(auth, user.email, user.password)
			.then((response) => {
				const loggedInUser = {
					userName: response.user.displayName,
					uid: response.user.uid,
					email: response.user.email,
				};
				// localStorage.setItem('user', JSON.stringify(loggedInUser));
				dispatch({ type: authConstant.USER_LOGIN_SUCCESS, payload: { user: loggedInUser } });
			})
			.catch((error) => {
				dispatch({ type: authConstant.USER_LOGIN_FAILURE, payload: { error: error.message } });
			});
	};
};

export const autoSignIn = () => {
	return (dispatch) => {
		console.log('autoSignIn');
		dispatch({ type: authConstant.USER_LOGIN_REQUEST });
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const loggedInUser = {
					userName: user.displayName,
					uid: user.uid,
					email: user.email,
				};
				dispatch({ type: authConstant.USER_LOGIN_SUCCESS, payload: { user: loggedInUser } });
			} else {
				dispatch({ type: authConstant.USER_LOGIN_FAILURE, payload: { error: 'Login again please' } });
			}
		});
	};
};

export const logout = () => {
	return (dispatch) => {
		console.log('logOut');
		dispatch({ type: authConstant.USER_LOGOUT_REQUEST });
		signOut(auth)
			.then(() => {
				dispatch({ type: authConstant.USER_LOGOUT_SUCCESS });
			})
			.catch((error) => {
				console.log(error);
				dispatch({ type: authConstant.USER_LOGOUT_FAILURE, payload: { error: error.message } });
			});
	};
};
