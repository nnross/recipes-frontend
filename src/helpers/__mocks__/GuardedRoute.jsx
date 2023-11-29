import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const GuardedRoute = ({
  loggedIn,
  scroll,
  token,
  accountId,
}) => (
  <div>
    guarded
    <Outlet context={[scroll, token, accountId, loggedIn]} />
  </div>
);

export default GuardedRoute;
