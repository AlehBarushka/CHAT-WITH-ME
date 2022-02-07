import React from 'react';
import { useState } from 'react';

import User from './User';

const UsersArea = (props) => {
	const { initChat, users } = props;
	const [searchValue, setSearchValue] = useState('');

	return (
		<div className='lg:border-r md:border-r border-gray-300'>
			<div className='mx-3 my-3'>
				<div className='relative text-gray-600'>
					<span className='absolute inset-y-0 left-0 flex items-center pl-2'>
						<svg
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							viewBox='0 0 24 24'
							className='w-6 h-6 text-gray-300'
						>
							<path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
						</svg>
					</span>
					<input
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
						type='text'
						className='block w-full py-2 pl-10 bg-gray-100 rounded outline-none'
						name='search'
						placeholder='Search'
					/>
				</div>
			</div>
			<ul className='overflow-y-auto h-[10rem] lg:h-[40rem] md:h-[40rem] sm:h-[20rem]'>
				<h2 className='my-2 mb-2 ml-2 text-lg text-gray-600'>Пользователи</h2>
				{users.length > 0
					? users
							.filter((user) => {
								if (searchValue === '') {
									return user;
								} else if (user.userName.includes(searchValue)) {
									return user;
								}
								return false;
							})
							.map((user) => {
								return <User user={user} key={user.uid} initChat={(user) => initChat(user)} />;
							})
					: null}
			</ul>
		</div>
	);
};

export default UsersArea;
