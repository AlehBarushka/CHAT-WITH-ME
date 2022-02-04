import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginPage = ({ auth }) => {
	return auth.isAuth ? <Navigate to='/home' /> : <LoginForm />;
};

export default LoginPage;
