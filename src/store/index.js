import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';

const store = createStore(rootReducers, applyMiddleware(thunk));

window.store = store;

export default store;
