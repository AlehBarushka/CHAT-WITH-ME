import React from 'react';
import { Navigate } from 'react-router-dom';
import Chat from './Chat';

const ChatPage = ({ authData }) => {
	return authData.isAuth ? <Chat /> : <Navigate to='/login' />;
};

export default ChatPage;
