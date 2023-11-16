import React, { useState } from 'react';
import propTypes from 'prop-types';
import LoginForm from './LoginForm';
import CreateNewForm from './CreateNewForm';

const Login = ({ className, id, closeLogin }) => {
  const [login, setLogin] = useState(true);
  return (
    <div className={className} id={id}>
      <button className={`${className}__close`} onClick={closeLogin} type="button"> close </button>
      <div className={`${className}__form`}>
        {login
          ? <LoginForm switchView={() => setLogin(false)} />
          : <CreateNewForm switchView={() => setLogin(true)} /> }
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
