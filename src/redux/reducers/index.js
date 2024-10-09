import {combineReducers} from '@reduxjs/toolkit';
import AppReducer from './app.reducer';
import { messagesReducer } from './messages.reducer';

export default combineReducers({
  app: AppReducer,
  chat: messagesReducer,
});
