import React from 'react';
import { Navigate } from 'react-router-dom';
import Chat from './Chat';

const ChatPage = ({ auth }) => {
	return auth.isAuth ? <Chat /> : <Navigate to='/login' />;
};

export default ChatPage;
