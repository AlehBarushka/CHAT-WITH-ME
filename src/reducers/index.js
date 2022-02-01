import { combineReducers } from 'redux';
import auth from './auth.reducer';

let rootReducers = combineReducers({ auth });

export default rootReducers;
