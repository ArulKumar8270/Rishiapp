
import { applyMiddleware, createStore } from 'redux'
import rootreducer from './reducers'
import thunk from 'redux-thunk';

const store = createStore(rootreducer, applyMiddleware());
export default store;