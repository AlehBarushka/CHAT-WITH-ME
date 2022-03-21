import React from 'react';

const Message = ({ message, uid, auth }) => {
	return (
		<div
			className={
				auth.uid === uid
					? 'flex justify-end mt-1 w-full'
					: 'flex justify-start mt-1 w-full'
			}
		>
			<p
				className={
					auth.uid === uid
						? 'block text-sm px-4 py-1 text-gray-700 bg-blue-100 rounded shadow'
						: 'block text-sm px-4 py-1 text-gray-700 rounded shadow'
				}
			>
				{message}
			</p>
		</div>
	);
};

export default Message;
