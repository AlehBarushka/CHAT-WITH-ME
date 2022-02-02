import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../service/firebaseConfig';
import { authConstants } from './constatnts';

export const signUp = (user) => {
	return async (dispatch) => {
		console.log('sigUP');
		dispatch({ type: authConstants.USER_LOGIN_REQUEST });
		createUserWithEmailAndPassword(auth, user.email, user.password)
			.then((response) => {
				updateProfile(auth.currentUser, { displayName: user.userName });
				setDoc(doc(db, 'users', response.user.uid), {
					userName: user.userName,
					uid: response.user.uid,
					createdAt: new Date(),
					isOnline: true,
				}).then(() => {
					const loggedInUser = {
						userName: user.userName,
						uid: response.user.uid,
						email: user.email,
					};
					dispatch({ type: authConstants.USER_LOGIN_SUCCESS, payload: { user: loggedInUser } });
				});
			})
			.catch((error) => {
				dispatch({ type: authConstants.USER_LOGIN_FAILURE, payload: { error: error.message } });
			});
	};
};

export const signIn = (user) => {
	return (dispatch) => {
		dispatch({ type: authConstants.USER_LOGIN_REQUEST });
		signInWithEmailAndPassword(auth, user.email, user.password)
			.then((response) => {
				const ref = doc(db, 'users', response.user.uid);
				updateDoc(ref, {
					isOnline: true,
				});
				const loggedInUser = {
					userName: response.user.displayName,
					uid: response.user.uid,
					email: response.user.email,
				};
				dispatch({ type: authConstants.USER_LOGIN_SUCCESS, payload: { user: loggedInUser } });
			})
			.catch((error) => {
				dispatch({ type: authConstants.USER_LOGIN_FAILURE, payload: { error: error.message } });
			});
	};
};

export const autoSignIn = () => {
	return (dispatch) => {
		console.log('autoSignIn');
		dispatch({ type: authConstants.USER_LOGIN_REQUEST });
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const loggedInUser = {
					userName: user.displayName,
					uid: user.uid,
					email: user.email,
				};
				dispatch({ type: authConstants.USER_LOGIN_SUCCESS, payload: { user: loggedInUser } });
			} else {
				dispatch({ type: authConstants.USER_LOGIN_FAILURE, payload: { error: 'Login again please' } });
			}
		});
	};
};

export const logout = (uid) => {
	return async (dispatch) => {
		try {
			await dispatch({ type: authConstants.USER_LOGOUT_REQUEST });
			const ref = doc(db, 'users', uid);
			await updateDoc(ref, {
				isOnline: false,
			});
			await signOut(auth);
			await dispatch({ type: authConstants.USER_LOGOUT_SUCCESS });
		} catch (error) {
			console.log(error);
			dispatch({ type: authConstants.USER_LOGOUT_FAILURE, payload: { error: error.message } });
		}
	};
};
