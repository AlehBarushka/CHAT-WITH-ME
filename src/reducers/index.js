import { combineReducers } from 'redux';
import authReducer from './auth.reducer';

const rootReducers = combineReducers({ auth: authReducer });

export default rootReducers;
