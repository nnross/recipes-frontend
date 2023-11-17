import React, { useState } from 'react';
import propTypes from 'prop-types';

/**
 * The Header component.
 * @property {String} className - Custom className if wanted. Default is header.
 * @property {String} id - Custom id if wanted. Default is header.
 * @property {Function} openLogin - Function to open the login form.
 * @property {Boolean} loggedIn - Status of being logged in. True if logged, false otherwise.
 * @returns Header
 */
const Header = ({
  className, id, openLogin, loggedIn,
}) => {
  const [nav, setNav] = useState(null);

  /**
   * Function to log out of the application. Done by removing the token and id from account.
   */
  const logOut = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('accountId');
    window.location.reload();
  };

  /**
   * Opens the nav by setting it to the state.
   */
  const openNav = () => {
    setNav(
      <nav className={`${className}__nav__sidebar`} id={`${id}__nav__sidebar`}>
        <button className={`${className}__nav__sidebar__close`} id={`${id}__nav__sidebar__close`} onClick={() => setNav(null)} type="button" aria-label="close" />
        <a className={`${className}__nav__sidebar__home`} href="/home"> home </a>
        <a className={`${className}__nav__sidebar__search`} href="/search"> search </a>
        <a className={`${className}__nav__sidebar__settings`} href="/today"> today&apos;s recipe </a>
        <a className={`${className}__nav__sidebar__settings`} href="/personal"> personal </a>
        <a className={`${className}__nav__sidebar__settings`} href="/settings"> settings </a>
        <button className={`${className}__nav__sidebar__logout`} type="button" onClick={() => logOut()}>LOG OUT</button>
      </nav>,
    );
  };
  return (
    <header className={className} id={id}>
      <div className={`${className}__nav`} id={`${id}__nav`}>
        <button className={`${className}__nav__button`} id={`${id}__nav__button`} onClick={openNav} type="button" aria-label="hamburger" />
        <div className={`${className}__nav__icon`} id={`${id}__nav__icon`} />
        {nav}
      </div>
      <div className={`${className}__title`} id={`${id}__title`}>
        <h4 className={`${className}__title__text`} id={`${id}__title__text`}>
          RecipeBuddy
        </h4>
      </div>
      <div className={`${className}__logIn`} id={`${id}__logIn`}>
        {loggedIn ? (null
        ) : (<button className={`${className}__logIn__button`} id={`${id}__logIn__button`} onClick={openLogin} type="button">LOG IN</button>)}
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  openLogin: propTypes.func,
  loggedIn: propTypes.bool,
};

Header.defaultProps = {
  className: 'header',
  id: 'header',
  openLogin: null,
  loggedIn: false,
};
