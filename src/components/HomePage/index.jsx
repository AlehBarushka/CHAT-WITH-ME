import React from 'react';
import { Navigate } from 'react-router-dom';
import Chat from './Chat';

const HomePage = ({ auth }) => {
	return auth.isAuth ? <Chat /> : <Navigate to='/login' />;
};

export default HomePage;
