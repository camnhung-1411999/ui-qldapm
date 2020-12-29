const URL = 'http://localhost:4000';

export const API = {
  // authentication
  USERS: `${URL}/users/`,

  TRANSACTION: `${URL}/transactions`,
  // refresh token
  REFRESH_TOKEN: `${URL}/auth/refresh-token`,
  // user
  GET_PROFILE: email => `${URL}/users/${email}`,

  //file
  FILE: `${URL}/files`
};
