import React from 'react';
import { Navigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';

const SignUpPage = ({ auth }) => {
	return auth.isAuth ? <Navigate to='/home' /> : <SignUpForm />;
};

export default SignUpPage;
