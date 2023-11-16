import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import propTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';
import Login from '../pages/login/Login';

/**
 * Sets the header and footer to all pages automatically.
 * @property {String} className - Custom className if wanted. Default is layout.
 * @property {String} id - Custom id if wanted. Default is layout.
 * @returns full view
 */
const Layout = ({ className, id }) => {
  const [scroll, setScroll] = useState(0);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll);
  }, []);

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
        <Header scroll={scroll} openLogin={() => openLogin()} />
      </div>

      {login ? (
        <div className={`${className}__login`}>
          <Login closeLogin={() => openLogin()} />
        </div>
      ) : (null)}

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
