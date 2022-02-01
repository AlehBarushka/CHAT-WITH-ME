import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';
import { signUp } from '../../actions';

const sigUpValidation = Yup.object().shape({
	userName: Yup.string().required('Пожалуйста, введите имя'),
	email: Yup.string().email('Email не верного формата').required('Пожалуйста, введите email'),
	password: Yup.string().min(6, 'Пароль должен содержать не менее 6 символов').required('Пожалуйста, введите пароль'),
});

const SignUpForm = () => {
	const dispatch = useDispatch();

	const registerUser = (values) => {
		dispatch(signUp(values));
	};

	return (
		<div className='container mx-auto p-4 bg-white'>
			<div className='w-full md:w-1/2 lg:w-1/3 mx-auto my-12'>
				<Formik
					initialValues={{ userName: '', email: '', password: '' }}
					validationSchema={sigUpValidation}
					onSubmit={registerUser}
				>
					{({ errors, touched }) => (
						<Form className='flex flex-col mt-4'>
							<div className='mb-4'>
								<label className='block text-grey-darker text-sm font-bold mb-2' htmlFor='userName'>
									Имя
								</label>
								<Field
									name='userName'
									type='text'
									className='block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none '
									placeholder='Имя'
								/>
								{touched.userName && errors.userName && <div className='text-red-500 text-xs'>{errors.userName}</div>}
							</div>
							<div className='mb-4'>
								<label className='block text-grey-darker text-sm font-bold mb-2' htmlFor='email'>
									Email
								</label>
								<Field
									type='text'
									name='email'
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none '
									placeholder='Email'
								/>
								{touched.email && errors.email && <div className='text-red-500 text-xs'>{errors.email}</div>}
							</div>
							<div className='mb-6'>
								<label htmlFor='password' className='block text-grey-darker text-sm font-bold mb-2'>
									Пароль
								</label>
								<Field
									type='password'
									name='password'
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									placeholder='Password'
								/>
								{touched.password && errors.password && <div className='text-red-500 text-xs'>{errors.password}</div>}
							</div>
							<button
								type='submit'
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							>
								Зарегистрироваться
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default SignUpForm;
