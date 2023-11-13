import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import propTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';

/**
 * Sets the header and footer to all pages automatically.
 * @returns full view
 */
const Layout = ({ className, id }) => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={className} id={id}>
      <div
        className={`${className}__header`}
        id={`${id}__header`}
        style={scroll > 0 ? { height: '90px' } : { height: '140px' }}
      >
        <Header scroll={scroll} />
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
