import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

/**
 * Sets the header and footer to all pages automatically.
 * @returns full view
 */
const Layout = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="layout" id="layout">
      <div
        className="layout__header"
        style={scroll > 0 ? { height: '90px' } : { height: '140px' }}
      >
        <Header scroll={scroll} />
      </div>
      <div className="layout__content">
        <Outlet context={scroll} />
      </div>
      <div className="layout__footer">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
