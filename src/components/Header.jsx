import React from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';

/**
 * The Header component.
 * @property {String} className - Custom className if wanted. Default is header.
 * @property {String} id - Custom id if wanted. Default is header.
 * // TODO: add openLogin
 * @returns Header.
 */
const Header = ({ className, id, openLogin, loggedIn }) => {
  const openNav = () => {
    $(`#${id}__nav__sidebar`).css('display', 'flex');
  };
  const closeNav = () => {
    $(`#${id}__nav__sidebar`).css('display', 'none');
  };
  const logOut = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('accountId');
    window.location.reload();
  };
  return (
    <header className={className} id={id}>
      <div className={`${className}__nav`} id={`${id}__nav`}>
        <button className={`${className}__nav__button`} id={`${id}__nav__button`} onClick={openNav} type="button" aria-label="hamburger" />
        <div className={`${className}__nav__icon`} id={`${id}__nav__icon`} />
        <nav className={`${className}__nav__sidebar`} id={`${id}__nav__sidebar`}>
          <button className={`${className}__nav__sidebar__close`} id={`${id}__nav__sidebar__close`} onClick={closeNav} type="button" aria-label="close" />
          <a className={`${className}__nav__sidebar__home`} href="/home"> home </a>
          <a className={`${className}__nav__sidebar__search`} href="/search"> search </a>
          <a className={`${className}__nav__sidebar__settings`} href="/today"> today&apos;s recipe </a>
          <a className={`${className}__nav__sidebar__settings`} href="/personal"> personal </a>
          <a className={`${className}__nav__sidebar__settings`} href="/settings"> settings </a>
          <button className={`${className}__nav__sidebar__logout`} type="button" onClick={() => logOut()}> log out </button>
        </nav>
      </div>
      <div className={`${className}__title`} id={`${id}__title`}>
        <h4 className={`${className}__title__text`} id={`${id}__title__text`}>
          RecipeBuddy
        </h4>
      </div>
      <div className={`${className}__logIn`} id={`${id}__logIn`}>
        {loggedIn ? (null
        ) : (<button className={`${className}__logIn__button`} id={`${id}__logIn__button`} onClick={openLogin} type="button">Log in</button>)}
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  openLogin: propTypes.func,
};

Header.defaultProps = {
  className: 'header',
  id: 'header',
  openLogin: null,
};
