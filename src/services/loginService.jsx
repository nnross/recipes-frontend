/* eslint-disable no-unused-vars */
// TODO: actual call to backend
const getAccount = (username, password) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: 'testToken', id: 'testId' });
    }, 1000);
  })
);

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
