import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';
import { setCurrentUser } from './slices/authSlice';
import { auth } from './service/firebaseConfig';

import ChatPage from './components/Chat';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Header from './components/Header';

const App = () => {
	const dispatch = useDispatch();
	const authData = useSelector((state) => state.authData);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const loggedInUser = {
					userName: user.displayName,
					uid: user.uid,
					email: user.email,
				};
				dispatch(setCurrentUser(loggedInUser));
			}
		});
	}, [dispatch]);

	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<ChatPage authData={authData} />} />
				<Route path='/login' element={<LoginPage authData={authData} />} />
				<Route path='/signup' element={<SignUpPage authData={authData} />} />
			</Routes>
		</Router>
	);
};

export default App;
