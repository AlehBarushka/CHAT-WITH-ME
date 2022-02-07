import React from 'react';

const User = (props) => {
	const { user, initChat } = props;
	return (
		<>
			<div
				onClick={() => initChat(user)}
				className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none'
			>
				<img
					className='object-cover w-8 h-8 rounded-full'
					src='https://www.opensds.io/wp-content/uploads/sites/18/2019/03/user-unknown-1-300x300.png'
					alt='username'
				/>
				<div className='w-full pb-2'>
					<div className='flex justify-between'>
						<span className='block ml-2 font-semibold text-gray-600'>{user.userName}</span>
						<span
							className={
								user.isOnline ? 'inline-block w-2 h-2 bg-green-400 rounded-full shadow shadow-green-500/50' : ''
							}
						></span>
					</div>
				</div>
			</div>
		</>
	);
};

export default User;
