import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { autoSignIn } from './actions';

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Header from './components/Header';

const App = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (!auth.isAuth) {
			dispatch(autoSignIn());
		}
	}, [dispatch, auth.isAuth]);

	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/home' element={<HomePage auth={auth} />} />
				<Route path='/login' element={<LoginPage auth={auth} />} />
				<Route path='/signup' element={<SignUpPage auth={auth} />} />
			</Routes>
		</Router>
	);
};

export default App;
