import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import propTypes from 'prop-types';
/**
 * Checks if user is logged in when entering page and redirects to login if not.
 * @returns login page if not logged in, outlet page otherwise
 */
const GuardedRoute = ({
  loggedIn,
  scroll,
  token,
  accountId,
}) => (
  !loggedIn ? <Navigate to="/" /> : <Outlet context={[scroll, token, accountId, loggedIn]} />
);

export default GuardedRoute;

GuardedRoute.propTypes = {
  loggedIn: propTypes.bool,
  scroll: propTypes.number,
  token: propTypes.string,
  accountId: propTypes.string,
};

GuardedRoute.defaultProps = {
  loggedIn: false,
  scroll: 0,
  token: null,
  accountId: null,
};
