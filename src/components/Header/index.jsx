import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const Header = (props) => {
	return (
		<header className='flex items-center justify-between flex-wrap bg-blue-500 p-6'>
			<Link to={'/'} className='font-semibold text-xl text-white tracking-tight'>
				CHAT-WITH-ME
			</Link>
			<div>Hi, Aleh!</div>
			<div>
				<Link
					to={'/login'}
					className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white
						hover:border-transparent hover:text-blue-800 hover:bg-white mt-4 lg:mt-0'
					onClick={props}
				>
					Login
				</Link>
				<Link
					to={'/signup'}
					className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white
						hover:border-transparent hover:text-blue-800 hover:bg-white mt-4 lg:mt-0'
					onClick={props}
				>
					SignUp
				</Link>
				<Link
					to={'#'}
					className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white
						hover:border-transparent hover:text-blue-800 hover:bg-white mt-4 lg:mt-0'
					onClick={props}
				>
					Logout
				</Link>
			</div>
		</header>
	);
};

export default Header;
