import React from 'react';
import propTypes from 'prop-types';
import SearchField from '../../components/SearchField';

const LoginForm = ({ className, id, switchView }) => (
  <div className={className} id={id}>
    <h3 className={`${className}__title`}> Login </h3>
    <form className={`${className}__form`}>
      <input placeholder="username" />
      <input placeholder="password" />
    </form>
    <button className={`${className}__login`} onClick={switchView} type="button"> Login </button>
    <p className={`${className}__switch`}>
      don&apos;t have an account?
      <button className={`${className}__switch__btn`} onClick={switchView} type="button"> Create new. </button>
    </p>
  </div>
);

export default LoginForm;

LoginForm.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  switchView: propTypes.func,
};

LoginForm.defaultProps = {
  className: 'loginForm',
  id: 'loginForm',
  switchView: null,
};
