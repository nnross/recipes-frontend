/* eslint-disable react/prop-types */
import React from 'react';

const Login = ({ className, id, closeLogin }) => (
  <div className={className} id={id}>
    Login
    <button onClick={closeLogin} type="button"> close login </button>
  </div>
);

export default Login;
