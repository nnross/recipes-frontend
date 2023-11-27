/* eslint-disable no-unused-vars */
import { user } from '../tests/testData/account.json';
// TODO: actual call to backend
const getAccountData = (accountId, token) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 1000);
  })
);

export default {
  getAccountData,
};
