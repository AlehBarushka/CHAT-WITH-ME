import { userConstants } from './constatnts';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';

export const getRealTimeUsers = (uid) => {
	return async (dispatch) => {
		dispatch({ type: userConstants.GET_REALTIME_USERS_REQUEST });
		const q = query(collection(db, 'users'), where('uid', '!=', uid));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const users = [];
			querySnapshot.forEach((doc) => {
				users.push(doc.data());
			});
			dispatch({
				type: userConstants.GET_REALTIME_USERS_SUCCESS,
				payload: {
					users,
				},
			});
		});
		return unsubscribe;
	};
};
