import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../service/firebaseConfig';

export const signUp = (user) => {
	return (dispatch) => {
		createUserWithEmailAndPassword(auth, user.email, user.password)
			.then((user) => {
				console.log(user);
			})
			.catch((error) => {
				console.log(error);
			});
	};
};
