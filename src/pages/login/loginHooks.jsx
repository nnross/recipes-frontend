/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import loginService from '../../services/loginService';

// TODO: preprocessing for actual call
export const UseLogin = (username, password, setLoading, setError) => {
  loginService.getAccount(username, password)
    .then((res) => {
      setLoading(0);
      window.localStorage.setItem('token', res.token);
      window.localStorage.setItem('accountId', res.id);
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
