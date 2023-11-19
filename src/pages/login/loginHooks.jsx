/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import loginService from '../../services/loginService';

// TODO: preprocessing for actual call
export const UseLogin = (username, password, setLoading, setError) => {
  loginService.getAccount(username, password)
    .then(() => {
      setLoading(0);
      console.log(`${username} and ${password}`);
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

export const UseCreateAccount = (name, email, username, password, confirm, setLoading, setError) => {
  loginService.getAccount(username, password)
    .then(() => {
      setLoading(0);
      console.log(`${name}, ${email}, ${username}, ${password}, ${confirm}`);
    })
    .catch(() => {
      setError('An error has occurred');
      setLoading(4);
    });
};
