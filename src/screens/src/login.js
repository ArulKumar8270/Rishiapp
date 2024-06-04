import http from './api';
import config from './constants';

const loginIBUser = async request => {
  const response = await http.post(
    config.apiRoute.LOGIN,
    {
      ...request
    },
    {},
    console.log('request',request)
  );   
  return response;
};

const Auth = {
  loginIBUser
};
export default Auth;
