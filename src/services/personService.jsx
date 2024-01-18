import axios from 'axios';

const baseUrl = 'https://recipes-backend-wxel.onrender.com/account';

/**
 * Gets account data from the database.
 * @param {Sting} accountId - wanted account id
 * @param {String} token - token for account
 * @returns data for account
 */
const getAccountData = async (accountId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${baseUrl}/get?accountId=${accountId}`, config);
  return res.data;
};

/**
 * updates account data to the database.
 * @param {Sting} accountId - wanted account id
 * @param {String} token - token for account
 * @param {payload} payload - data to be updated
 * @returns true if successful, error otherwise.
 */
const postAccountData = async (accountId, token, payload) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.put(`${baseUrl}/update?accountId=${accountId}`, payload, config);
  return res.data;
};

/**
 * deletes account from the database.
 * @param {Sting} accountId - wanted account id
 * @param {String} token - token for account
 * @returns true if successful, error otherwise.
 */
const deleteAccountData = async (accountId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.delete(`${baseUrl}/delete?accountId=${accountId}`, config);
  return res.data;
};

export default {
  getAccountData, postAccountData, deleteAccountData,
};
