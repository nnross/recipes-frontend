import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import propTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';
import Login from '../pages/login/Login';
import GuardedRoute from '../helpers/GuardedRoute';

/**
 * Sets the header and footer to all pages automatically.
 * @property {String} className - Custom className if wanted. Default is layout.
 * @property {String} id - Custom id if wanted. Default is layout.
 * @property {Bool} guarded - if route is guarded or not.
 * @returns full view
 */
const Layout = ({ className, id, guarded }) => {
  const loggedIn = window.localStorage.getItem('token') != null;

  const [scroll, setScroll] = useState(0);
  const [login, setLogin] = useState(false);
  const [accountId, setAccountId] = useState();
  const [token, setToken] = useState();

  /**
   * UseEffect to add the scroll eventListener and get the state.
   * Also gets if user is logged in or not.
   */
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll);

    setAccountId(window.localStorage.getItem('accountId'));
    setToken(window.localStorage.getItem('token'));
  }, []);

  /**
   * Opens and closes the login popup.
   */
  const openLogin = () => {
    if (login) {
      setLogin(false);
      document.body.style.overflow = 'scroll';
      return;
    }

    setLogin(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <div className={className} id={id}>
      <div
        className={`${className}__header`}
        id={`${id}__header`}
        style={scroll > 0 ? { height: '90px' } : { height: '140px' }}
      >
        <Header scroll={scroll} openLogin={() => openLogin()} loggedIn={loggedIn} />
      </div>

      {login ? (
        <div className={`${className}__login`}>
          <Login closeLogin={() => openLogin()} />
        </div>
      ) : (null)}

      <div className={`${className}__content`}>
        {guarded
          ? (
            <GuardedRoute
              loggedIn={loggedIn}
              scroll={scroll}
              token={token}
              accountId={accountId}
            />
          )
          : <Outlet context={[scroll, token, accountId, loggedIn]} />}
      </div>
      <div className={`${className}__footer`}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  guarded: propTypes.bool,
};

Layout.defaultProps = {
  className: 'layout',
  id: 'layout',
  guarded: true,
};
