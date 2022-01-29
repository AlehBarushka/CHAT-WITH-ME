import { Formik } from 'formik';
import React from 'react';
import Layout from '../../Layout';
import Card from '../../Layout/UI/Card';

import './style.css';

const LoginPage = () => {
	return (
		<>
			<Layout />
			<div className='login-container'>
				<Card>
					<Formik />
					form
				</Card>
			</div>
		</>
	);
};

export default LoginPage;
