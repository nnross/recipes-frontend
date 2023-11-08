import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

/**
 * Sets the header and footer to all pages automatically.
 * @returns full view
 */
const Layout = () => (
  <div className="layout" id="layout">
    <Outlet />
    <div className="layout__footer">
      <Footer />
    </div>
  </div>
);

export default Layout;
