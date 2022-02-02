import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import userReducer from './user.reducer';

const rootReducers = combineReducers({ auth: authReducer, users: userReducer });

export default rootReducers;
