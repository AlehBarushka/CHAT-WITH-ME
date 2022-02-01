import { createStore } from 'redux';
import rootReducers from '../reducers';

const store = createStore(rootReducers);

window.store = store;

export default store;
