import loginService from '../../services/loginService';

/**
 * Calls the service to login the user. Handles errors and success.
 * @param {String} username - username of login.
 * @param {String} password - password of login.
 * @param {Func} setLoading - function to set loading state.
 * @param {Func} setError - function to set error message.
 * @param {Func} closeLogin - function to close the login view.
 */
export const UseLogin = (username, password, setLoading, setError, closeLogin) => {
  const payload = {
    username,
    password,
  };
  loginService.getAccount(payload)
    .then((res) => {
      window.localStorage.setItem('token', res.token);
      window.localStorage.setItem('accountId', res.accountId);
      window.localStorage.setItem('expiration', Date.now() + 1000 * 60 * 120);
      setLoading(0);
      closeLogin();
    })
    .catch((exception) => {
      if (exception.response.status === 403) {
        setError('Incorrect username or password');
      } else {
        setError('An error has occurred');
      }
      setLoading(4);
    });
};

/**
 * Calls the service to create a new account for a user and handles all the errors and success.
 * @param {String} name - name of the account
 * @param {String} email - email of the account
 * @param {String} username - username of the account
 * @param {String} password - password of the account
 * @param {Func} setLoading - function to set the loading state.
 * @param {Func} setError - function to set the error message.
 * @param {Func} closeLogin - function to close the login view.
 */
export const UseCreateAccount = (
  name,
  email,
  username,
  password,
  setLoading,
  setError,
  closeLogin,
) => {
  const payload = {
    name,
    email,
    username,
    password,
  };

  loginService.createAccount(payload)
    .then((res) => {
      window.localStorage.setItem('token', res.token);
      window.localStorage.setItem('accountId', res.accountId);
      window.localStorage.setItem('expiration', Date.now() + 1000 * 60 * 120);
      setLoading(0);
      closeLogin();
    })
    .catch(() => {
      setError('An error has occurred');
      setLoading(4);
    });
};
