import React from 'react';

const Message = (props) => {
	const { message, uid, auth } = props;

	return (
		<div className={auth.uid === uid ? 'flex justify-end mt-1 w-full' : 'flex justify-start mt-1 w-full'}>
			<p
				className={
					auth.uid === uid
						? 'block px-4 py-2 text-gray-700 bg-blue-100 rounded shadow'
						: 'block px-4 py-2 text-gray-700 rounded shadow'
				}
			>
				{message}
			</p>
		</div>
	);
};

export default Message;
