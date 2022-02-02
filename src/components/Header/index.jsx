import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth.actions';

const Header = (props) => {
	const dispatch = useDispatch();
	const uid = useSelector((state) => state.auth.uid);
	const logoutUser = () => {
		dispatch(logout(uid));
	};
	return (
		<header className='flex items-center justify-between flex-wrap bg-blue-500 p-6'>
			<Link to={'/'} className='font-semibold text-xl text-white tracking-tight'>
				CHAT-WITH-ME
			</Link>
			<div className='font-semibold text-xl text-white tracking-tight'>{`Hello ${props.auth.userName}!`}</div>
			<div>
				{props.auth.isAuth ? (
					<button
						className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white
						hover:border-transparent hover:text-blue-800 hover:bg-white mt-4 lg:mt-0'
						onClick={logoutUser}
					>
						Logout
					</button>
				) : (
					<>
						<Link
							to={'/login'}
							className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white
						hover:border-transparent hover:text-blue-800 hover:bg-white mr-5'
						>
							Login
						</Link>
						<Link
							to={'/signup'}
							className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white
						hover:border-transparent hover:text-blue-800 hover:bg-white'
						>
							SignUp
						</Link>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
