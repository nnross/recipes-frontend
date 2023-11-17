import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import propTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';

/**
 * Sets the header and footer to all pages automatically.
 * @property {String} className - Custom className if wanted. Default is layout.
 * @property {String} id - Custom id if wanted. Default is layout.
 * @returns full view
 */
const Layout = ({ className, id }) => {
  const [scroll, setScroll] = useState(0);
  const [loggedIn, setLoggedIn] = useState(null);

  /**
   * UseEffect to add the scroll eventListener and get the state.
   * Also gets if user is logged in or not.
   */
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll);

    setLoggedIn(window.localStorage.getItem('token') == null);
  }, []);

  return (
    <div className={className} id={id}>
      <div
        className={`${className}__header`}
        id={`${id}__header`}
        style={scroll > 0 ? { height: '90px' } : { height: '140px' }}
      >
        <Header scroll={scroll} loggedIn={loggedIn} />
      </div>
      <div className={`${className}__content`}>
        <Outlet context={scroll} />
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
};

Layout.defaultProps = {
  className: 'layout',
  id: 'layout',
};
