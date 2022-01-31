import { Field, Form, withFormik } from 'formik';
import * as Yup from 'yup';

import React from 'react';

const LoginForm = (props) => {
	const { touched, errors } = props;
	return (
		<div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col'>
			<Form>
				<div className='mb-4'>
					<label className='block text-grey-darker text-sm font-bold mb-2' htmlFor='email'>
						Email
					</label>
					<Field
						type='text'
						name='email'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						placeholder='Email'
					/>
					{touched.email && errors.email && <span className='text-red-500 text-xs'>{errors.email}</span>}
				</div>
				<div className='mb-6'>
					<label htmlFor='password' className='block text-grey-darker text-sm font-bold mb-2'>
						Password
					</label>
					<Field
						type='password'
						name='password'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						placeholder='Password'
					/>
					{touched.password && errors.password && <span className='text-red-500 text-xs'>{errors.password}</span>}
				</div>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
				>
					Login
				</button>
			</Form>
		</div>
	);
};

const LoginFormik = withFormik({
	mapPropsToValues: (props) => {
		return {
			email: props.email || '',
			password: props.password || '',
		};
	},
	validationSchema: Yup.object().shape({
		email: Yup.string().email('Email не верного формата').required('Пожалуйста, введите email'),
		password: Yup.string().required('Пожалуйста, введите пароль'),
	}),
	handleSubmit: (values) => {
		console.log(values);
	},
})(LoginForm);

export default LoginFormik;
