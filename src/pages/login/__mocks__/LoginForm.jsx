import React from 'react';
import propTypes from 'prop-types';

const LoginForm = ({
  className, id, switchView, handleLogin, loading, error,
}) => (
  <div className={className} id={id}>
    <h3 className={`${className}__title`}> Login </h3>
    <form className={`${className}__form`} id={`${id}__form`} onSubmit={handleLogin}>
      <input placeholder="username" />
      <input placeholder="password" />
    </form>
    <div className={`${className}__error`}>
      {error}
    </div>
    {loading === 2 ? <p> loading </p> : <button className={`${className}__login`} type="submit" form={`${id}__form`}> Log in </button>}
    <p className={`${className}__switch`}>
      Don&apos;t have an account?
      <button className={`${className}__switch__btn`} onClick={switchView} type="button"> Create new. </button>
    </p>
  </div>
);

export default LoginForm;

LoginForm.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  switchView: propTypes.func,
  handleLogin: propTypes.func,
  loading: propTypes.number,
  error: propTypes.string,
};

LoginForm.defaultProps = {
  className: 'loginForm',
  id: 'loginForm',
  switchView: null,
  handleLogin: null,
  loading: 0,
  error: null,
};
