import React from 'react';
import { Navigate } from 'react-router-dom';

import SignUpForm from './SignUpForm';

const SignUpPage = ({ authData }) => {
	return authData.isAuth ? <Navigate to='/' /> : <SignUpForm />;
};

export default SignUpPage;
