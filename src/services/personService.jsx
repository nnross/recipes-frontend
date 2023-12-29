/* eslint-disable no-unused-vars */
import axios from 'axios';
import { user } from '../tests/testData/account.json';

const baseUrl = 'http://localhost:8080/account';

const getAccountData = async (accountId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${baseUrl}/get?accountId=${accountId}`, config);
  return res.data;
};

const postAccountData = (accountId, token, username, name, email, password) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
);

const deleteAccountData = (accountId, token) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
);

export default {
  getAccountData, postAccountData, deleteAccountData,
};
