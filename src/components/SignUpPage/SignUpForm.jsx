import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Field, Form, withFormik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../service/firebaseConfig';

const setUser = async (values) => {
	await createUserWithEmailAndPassword(auth, values.email, values.password);
};

const SignUpForm = (props) => {
	const { touched, errors } = props;

	return (
		<div className='container mx-auto p-4 bg-white'>
			<div className='w-full md:w-1/2 lg:w-1/3 mx-auto my-12'>
				<Form className='flex flex-col mt-4'>
					<div className='mb-4'>
						<label className='block text-grey-darker text-sm font-bold mb-2' htmlFor='nickName'>
							Имя
						</label>
						<Field
							type='text'
							name='nickName'
							className='block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none '
							placeholder='Имя'
						/>
						{errors.nickName && <span className='text-red-500 text-xs'>{errors.nickName}</span>}
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
						{errors.email && <span className='text-red-500 text-xs'>{errors.email}</span>}
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
						{touched.password && errors.password && <span className='text-red-500 text-xs'>{errors.password}</span>}
					</div>
					<button
						type='submit'
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
					>
						Зарегистрироваться
					</button>
				</Form>
			</div>
		</div>
	);
};

const SignUpFormik = withFormik({
	mapPropsToValues: (props) => {
		return {
			// nickName: props.nickName || '',
			email: props.email || '',
			password: props.password || '',
		};
	},
	validationSchema: Yup.object().shape({
		email: Yup.string().email('Email не верного формата').required('Пожалуйста, введите email'),
		password: Yup.string().required('Пожалуйста, введите пароль'),
	}),
	handleSubmit: setUser,
})(SignUpForm);

export default SignUpFormik;
