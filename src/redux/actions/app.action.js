import { SET_AUTH_TOKEN, SET_AUTH_TOKEN_ID, SET_CHAT_TO_COMPANY, SET_COMPANY_DATA, SET_EMPLYERLOGIN_RESPONSE, SET_LOGIN_RESPONSE, SET_MOBILE_NUMBER, SET_USER_DATA } from "../constants";


export const setAppMobileNumber = payload => ({
  type: SET_MOBILE_NUMBER,
  payload,
});

export const setloginResponse = payload => ({
  type: SET_LOGIN_RESPONSE,
  payload,
});  
export const setUserData=payload=>({
  type:SET_USER_DATA,
  payload,
})
export const setEmployerLoginResponse= payload =>({
  type:SET_EMPLYERLOGIN_RESPONSE,
  payload,
})
export const setCompanyData= payload =>({
  type:SET_COMPANY_DATA,
  payload,
})
export const setAuthToken = payload => ({ type: SET_AUTH_TOKEN, payload }); 
export const setChattoCompany=payload=>({type:SET_CHAT_TO_COMPANY,payload})