import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/containers/HomePage';
import LoginPage from './components/containers/LoginPage';
import SignUpPage from './components/containers/SignUpPage';

import './App.css';

const App = (props) => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignUpPage />} />
			</Routes>
		</Router>
	);
};

export default App;
