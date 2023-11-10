import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

/**
 * Sets the header and footer to all pages automatically.
 * @returns full view
 */
const Layout = () => (
  <div className="layout" id="layout">
    <div className="layout__header">
      <Header />
    </div>
    <div className="layout__content">
      <Outlet />
    </div>
    <div className="layout__footer">
      <Footer />
    </div>
  </div>
);

export default Layout;
