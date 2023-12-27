/* eslint-disable no-unused-vars */
import axios from 'axios';

const baseUrl = 'http://localhost:8080/account';

/**
 * Calls the backend with axios to login the user.
 * @param {JSON} payload - payload with username and password.
 * @returns data returned from the call.
 */
const getAccount = async (payload) => {
  const res = await axios.post(`${baseUrl}/login`, payload);
  return res.data;
};

// TODO: actual call to backend
const createAccount = (name, email, username, password) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: 'testToken', id: 'testId' });
    }, 1000);
  })
);

export default { getAccount, createAccount };

// error
// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const error = new Error();
//     error.response = { status: 403 };
//     reject(error);
//   }, 1000);
// })
