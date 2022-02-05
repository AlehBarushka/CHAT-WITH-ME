import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getRealTimeConversations, getRealTimeUsers } from '../../actions/users.actions';
import ChatArea from './ChatArea';
import ChatPreview from './ChatPreview';
import User from './User';

const Chat = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const chat = useSelector((state) => state.chat);
	const [chatStarted, setChatStarted] = useState(false);
	const [recipientUserName, setRecipientUserName] = useState('');
	const [message, setMessage] = useState('');
	const [recipientUid, setRecipientUid] = useState('');

	// subcribe for realtime update users and unsubscribe after unmount
	useEffect(() => {
		const unsubscribe = dispatch(getRealTimeUsers(auth.uid))
			.then((unsubscribe) => {
				return unsubscribe;
			})
			.catch((error) => {
				console.log(error);
			});
		return () => {
			unsubscribe
				.then((f) => {
					f();
				})
				.catch((error) => console.log(error));
		};
	}, [dispatch, auth.uid]);

	const initChat = (user) => {
		setChatStarted(true);
		setRecipientUserName(user.userName);
		setRecipientUid(user.uid);
		dispatch(getRealTimeConversations({ senderUid: auth.uid, recipientUid: user.uid }));
	};

	return (
		<div className='mt-5 lg:mt-10 md:mt-10 sm:mt-10 container mx-auto'>
			<div className='min-w-full border rounded grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1'>
				<div className='lg:border-r md:border-r border-gray-300'>
					{/* <div className='mx-3 my-3'>
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
								type='search'
								className='block w-full py-2 pl-10 bg-gray-100 rounded outline-none'
								name='search'
								placeholder='Search'
								required
							/>
						</div>
					</div> */}

					<ul className='overflow-y-auto h-[40rem]'>
						<h2 className='my-2 mb-2 ml-2 text-lg text-gray-600'>Пользователи</h2>
						{chat.users.length > 0
							? chat.users.map((user) => {
									return <User user={user} key={user.uid} initChat={(user) => initChat(user)} />;
							  })
							: null}
					</ul>
				</div>
				<div className='lg:col-span-3 md:col-span-2 sm:col-span-1'>
					{chatStarted ? (
						<ChatArea
							conversations={chat.conversations}
							auth={auth}
							recipientUserName={recipientUserName}
							senderUser={auth}
							recipientUid={recipientUid}
							message={message}
							setMessage={setMessage}
						/>
					) : (
						<ChatPreview />
					)}
				</div>
			</div>
		</div>
	);
};

export default Chat;
