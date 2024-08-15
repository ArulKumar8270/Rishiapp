import {
  SET_MOBILE_NUMBER,
  SET_LOGIN_RESPONSE,
  SET_AUTH_TOKEN
} from '../constants';
const initialState = {
  mobileNumber: null,
  loginResponse :'',
  authToken: null,
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
    default:
      return state;
  }
};
