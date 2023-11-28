import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import propTypes from 'prop-types';
/**
 * Checks if user is logged in when entering page and redirects to login if not.
 * @property {Bool} loggedIn - if user is logged in or not.
 * @property {number} scroll - current scroll on window.
 * @property {String} token - Token of user.
 * @property {String} accountId - accountId for user
 * @returns home page if not logged in, outlet page otherwise
 */
const GuardedRoute = ({
  loggedIn,
  scroll,
  token,
  accountId,
}) => (
  loggedIn ? <Outlet context={[scroll, token, accountId, loggedIn]} /> : <Navigate to="/" />
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
