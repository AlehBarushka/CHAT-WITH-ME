import { addDoc, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import { userConstants } from './constatnts';

export const updateMessage = (messageObj) => {
	return async (dispatch) => {
		await addDoc(collection(db, 'conversations'), {
			...messageObj,
			isView: false,
			createdAt: new Date(),
		});
	};
};

export const getRealTimeMessages = (user) => {
	return async (dispatch) => {
		dispatch({ type: userConstants.GET_REALTIME_MESSAGES_REQUEST });
		const q = query(
			collection(db, 'conversations'),
			where('senderUid', 'in', [user.senderUid, user.recipientUid]),
			orderBy('createdAt', 'asc')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const conversations = [];
			querySnapshot.forEach((doc) => {
				if (
					(doc.data().senderUid === user.senderUid && doc.data().recipientUid === user.recipientUid) ||
					(doc.data().senderUid === user.recipientUid && doc.data().recipientUid === user.senderUid)
				) {
					conversations.push(doc.data());
				}
			});
			dispatch({ type: userConstants.GET_REALTIME_MESSAGES_SUCCESS, payload: { conversations } });
		});
		return unsubscribe;
	};
};

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
