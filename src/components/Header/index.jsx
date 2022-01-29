import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = (props) => {
	return (
		<header className='header'>
			<div className='logo'>CHAT-WITH-ME</div>
			<ul className='leftMenu'>
				<li>
					<Link to={'/login'}>Login</Link>
				</li>
				<li>
					<Link to={'/signup'}>SignUp</Link>
				</li>
			</ul>
			<div>Hi, Aleh!</div>
			<ul className='menu'>
				<li>
					<Link to={'#'} onClick={props}>
						Logout
					</Link>
				</li>
			</ul>
		</header>
	);
};

export default Header;
