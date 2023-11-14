/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Header = ({
  className, id, openLogin, loggedIn,
}) => (
  <header className={className} id={id}>
    <h4 className={`${className}__title`} id={`${id}__title`}>
      RecipeBuddy
    </h4>
  </header>
);

export default Header;
