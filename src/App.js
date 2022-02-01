import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

import Header from './components/Header';
import { connect, useDispatch } from 'react-redux';
import { autoSignIn } from './actions';

const App = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (!props.auth.isAuth) {
			dispatch(autoSignIn());
		}
	}, [dispatch, props.auth.isAuth]);

	return (
		<Router>
			<Header {...props} />
			<Routes>
				<Route path='/' element={<HomePage {...props} />} />
				<Route path='/login' element={<LoginPage {...props} />} />
				<Route path='/signup' element={<SignUpPage {...props} />} />
			</Routes>
		</Router>
	);
};

const mapStateToProps = (state) => {
	return { auth: state.auth };
};

export default connect(mapStateToProps)(App);
