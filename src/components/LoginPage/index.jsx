import React from 'react';
import { Navigate } from 'react-router-dom';

import LoginForm from './LoginForm';

const LoginPage = ({ authData }) => {
	return authData.isAuth ? <Navigate to='/' /> : <LoginForm />;
};

export default LoginPage;
