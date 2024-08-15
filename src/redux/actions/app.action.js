import { SET_AUTH_TOKEN, SET_AUTH_TOKEN_ID, SET_LOGIN_RESPONSE, SET_MOBILE_NUMBER } from "../constants";


export const setAppMobileNumber = payload => ({
  type: SET_MOBILE_NUMBER,
  payload,
});


export const setloginResponse = payload => ({
  type: SET_LOGIN_RESPONSE,
  payload,
});  

export const setAuthToken = payload => ({ type: SET_AUTH_TOKEN, payload });