import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import chatReducer from './chat.reducer';

const rootReducers = combineReducers({ auth: authReducer, chat: chatReducer });

export default rootReducers;
