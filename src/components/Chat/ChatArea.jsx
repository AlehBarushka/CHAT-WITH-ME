import React, { useRef } from 'react';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { updateMessage } from '../../actions';

import Message from './Message';

const ChatArea = (props) => {
	const { auth, recipientUid, conversations, recipientUserName, message, setMessage } = props;
	const dispatch = useDispatch();
	const messagesEndRef = useRef(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView();
	}, [conversations]);

	const sendMessage = () => {
		const messageObj = {
			senderUid: auth.uid,
			recipientUid: recipientUid,
			message,
		};
		if (message !== '') {
			dispatch(updateMessage(messageObj));
			setMessage('');
		}
	};

	return (
		<div className='w-full'>
			<div className='flex items-center justify-center p-3 border-b border-gray-300'>
				<img
					className='object-cover w-10 h-10 rounded-full'
					src='https://www.opensds.io/wp-content/uploads/sites/18/2019/03/user-unknown-1-300x300.png'
					alt='userAvatar'
				/>
				<span className='block ml-2 font-bold text-gray-600'>{recipientUserName}</span>
			</div>
			<div className='w-full p-6 overflow-y-auto h-[20rem] lg:h-[40rem] md:h-[40rem] sm:h-[20rem]'>
				<div className='flex flex-col'>
					{conversations.messages.map((message) => (
						<Message auth={auth} key={message.createdAt.seconds} uid={message.senderUid} message={message.message} />
					))}
					<div ref={messagesEndRef} />
				</div>
			</div>
			<div className='flex items-center justify-between w-full p-3 border-t border-gray-300'>
				<button>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='w-6 h-6 text-gray-500'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				</button>
				<button>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='w-5 h-5 text-gray-500'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
						/>
					</svg>
				</button>
				<input
					type='text'
					placeholder='Message'
					className='block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700'
					name='message'
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					value={message}
					required
				/>
				<button onClick={sendMessage}>
					<svg
						className='w-5 h-5 text-gray-500 origin-center transform rotate-90'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
					</svg>
				</button>
			</div>
		</div>
	);
};

export default ChatArea;
