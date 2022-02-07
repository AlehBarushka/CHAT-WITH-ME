import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import conversationsReducer from './conversations.reducer';

const rootReducers = combineReducers({ auth: authReducer, conversations: conversationsReducer });

export default rootReducers;
