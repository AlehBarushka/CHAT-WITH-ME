import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getRealTimeMessages, getRealTimeUsers } from '../../actions';
import ChatArea from './ChatArea';
import ChatPreview from './ChatPreview';
import UsersArea from './UsersArea';

const Chat = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const conversations = useSelector((state) => state.conversations);
	const [chatStarted, setChatStarted] = useState(false);
	const [recipientUserName, setRecipientUserName] = useState('');
	const [message, setMessage] = useState('');
	const [recipientUid, setRecipientUid] = useState('');

	const initChat = (user) => {
		setChatStarted(true);
		setRecipientUserName(user.userName);
		setRecipientUid(user.uid);
		dispatch(getRealTimeMessages({ senderUid: auth.uid, recipientUid: user.uid }));
	};

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

	return (
		<div className='mt-5 lg:mt-10 md:mt-10 sm:mt-10 container mx-auto'>
			<div className='min-w-full border rounded grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1'>
				<UsersArea initChat={initChat} users={conversations.users} />
				<div className='lg:col-span-3 md:col-span-2 sm:col-span-1'>
					{chatStarted ? (
						<ChatArea
							conversations={conversations}
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
