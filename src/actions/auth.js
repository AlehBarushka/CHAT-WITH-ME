import { auth, firestore } from 'firebase';

export const signUp = (user) => {
	return (dispatch) => {
		const db = firestore();
		auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			.then((user) => {
				console.log(user);
			})
			.catch((error) => {
				console.log(error);
			});
	};
};
