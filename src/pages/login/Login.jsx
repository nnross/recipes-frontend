import React, { useState } from 'react';
import propTypes from 'prop-types';
import LoginForm from './LoginForm';
import CreateNewForm from './CreateNewForm';
import { UseLogin, UseCreateAccount } from './loginHooks';

/**
 * Renders login popup
 * @property {String} className - Custom class name if wanted, default login.
 * @property {String} id - Custom id if wanted, default login.
 * @property {function} closeLogin - Closes the login popup.
 * @returns Login popup
 */
const Login = ({ className, id, closeLogin }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(0);
  const [login, setLogin] = useState(true);

  /**
   * Handles the login.
   */
  const handleLogin = (e) => {
    setLoading(2);
    e.preventDefault();
    const values = e.target.elements;
    UseLogin(values[0].value, values[1].value, setLoading, setError, closeLogin);
  };
  /**
   * Handles the creation of a new account.
   */
  const handleCreate = (e) => {
    setLoading(2);
    e.preventDefault();
    const values = e.target.elements;
    UseCreateAccount(
      values[0].value,
      values[1].value,
      values[2].value,
      values[3].value,
      values[4].value,
      setLoading,
      setError,
    );
  };

  return (
    <div className={className} id={id}>
      <button className={`${className}__close`} onClick={closeLogin} type="button" aria-label="close" />
      <div className={`${className}__form`}>
        {login
          ? (
            <LoginForm
              switchView={() => setLogin(false)}
              handleLogin={handleLogin}
              loading={loading}
              error={error}
            />
          )
          : (
            <CreateNewForm
              switchView={() => setLogin(true)}
              handleCreate={handleCreate}
              loading={loading}
              error={error}
            />
          ) }
      </div>
    </div>
  );
};

export default Login;

Login.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  closeLogin: propTypes.func,
};

Login.defaultProps = {
  className: 'login',
  id: 'login',
  closeLogin: null,
};
