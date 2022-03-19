import { configureStore } from '@reduxjs/toolkit';
import rootReducers from '../slices';

const store = configureStore({
	reducer: rootReducers,
});

export default store;
