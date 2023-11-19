// TODO: actual call to backend
const getAccount = (username, password) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = new Error();
      error.response = { status: 403 };
      reject(error);
    }, 1000);
  })
);

export default { getAccount };
