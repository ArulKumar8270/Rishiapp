import axios from 'axios';
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT} from './authtypes';

// actions/userActions
export const loginrequest = () => ({
  type: LOGIN_REQUEST,
});
export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});
export const logOut = () => ({
  type: LOGOUT,
});
// export const LOGIN = (credentials) => {
//   return async (dispatch) => {
//     dispatch(loginrequest());
//     try {
//       const response = await axios.post(
//         'https://rishijob.com/backend/api/v1/customers/authenticate',
//         {
//           userName: credentials.MobileNumber,
//           password: credentials.Password,
//         },
//       );
//       dispatch(loginSuccess(response.data));
//     } catch (error) {
//       let errorMessage = 'An error occurred. Please try again.';
//       if (error.response) {
//         errorMessage = error.response.data.message;
//       } else if (error.request) {
//         errorMessage =
//           'No response from the server. Please check your internet connection and try again.';
//       }
//       dispatch(loginFailure(errorMessage));
//     }
//   };
// };
 