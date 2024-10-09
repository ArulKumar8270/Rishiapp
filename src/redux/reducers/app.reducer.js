import {
  SET_MOBILE_NUMBER,
  SET_LOGIN_RESPONSE,
  SET_AUTH_TOKEN,
  SET_USER_DATA,
  SET_EMPLYERLOGIN_RESPONSE,
  SET_COMPANY_DATA,
} from '../constants';
const initialState = {
  mobileNumber: null,
  loginResponse :'',
  authToken: null,
  userData:'',
  employerLoginResponse:'',
  companydata:'',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_MOBILE_NUMBER: {
      return {...state, mobileNumber: payload};
    }
    case SET_AUTH_TOKEN:
      return {...state, authToken: payload};
    case SET_LOGIN_RESPONSE: {
      return {...state, loginResponse: payload};
    }
    case SET_EMPLYERLOGIN_RESPONSE:{
      return {...state, employerLoginResponse: payload};
    }
    case SET_USER_DATA:{
      return {...state, userData: payload};
    }
    case SET_COMPANY_DATA:{
      return {...state, companydata: payload};
    }
    default:
      return state;
  }
};
