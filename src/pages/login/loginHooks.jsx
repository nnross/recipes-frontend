/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
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

// todo preprocessing for actual call
export const UseCreateAccount = (name, email, username, password, confirm, setLoading, setError) => {
  loginService.createAccount(name, email, username, password)
    .then((res) => {
      setLoading(0);
      window.localStorage.setItem('token', res.token);
      window.localStorage.setItem('accountId', res.id);
    })
    .catch(() => {
      setError('An error has occurred');
      setLoading(4);
    });
};
