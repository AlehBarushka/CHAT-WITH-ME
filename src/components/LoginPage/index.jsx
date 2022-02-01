import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginPage = (props) => {
	const { currentUser } = props;
	return currentUser ? <Navigate to='/' /> : <LoginForm />;
};

export default LoginPage;
