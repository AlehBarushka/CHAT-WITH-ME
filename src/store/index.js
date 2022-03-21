import { configureStore } from '@reduxjs/toolkit';
import conversationsReducer from '../reducers/conversations.reducer';
import authReducer from '../slices/authSlice';

const store = configureStore({
	reducer: { authData: authReducer, conversations: conversationsReducer },
});

export default store;
