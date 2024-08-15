import {combineReducers} from '@reduxjs/toolkit';
import AppReducer from './app.reducer';

export default combineReducers({
  app: AppReducer
});
