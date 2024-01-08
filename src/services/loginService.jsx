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

/**
 * Calls the backend with axios to create a new user.
 * @param {JSON} payload - payload with name, email, username and password.
 * @returns data returned from the call.
 */
const createAccount = async (payload) => {
  const res = await axios.post(`${baseUrl}/create`, payload);
  return res.data;
};

export default { getAccount, createAccount };
