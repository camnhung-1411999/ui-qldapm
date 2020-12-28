import { userConstants } from 'src/constants';

let user = JSON.parse(localStorage.getItem('accessToken'));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        error: action.error.status,
      }
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}