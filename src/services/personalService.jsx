import axios from 'axios';

const baseUrl = 'https://recipes-backend-wxel.onrender.com/pages';

/**
 * Gets the initial load data for the personal page from the database.
 * @param {Integer} accountId - id of the account.
 * @param {String} token - token for the account.
 * @returns data for personal page.
 */
const getPersonal = async (accountId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/personal?accountId=${accountId}`, config);
  return res.data;
};

export default { getPersonal };
