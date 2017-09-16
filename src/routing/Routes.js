import React from 'react';
import { Route } from 'react-router';

import UserPage from 'src/pages/User';
import Auth0Callback from 'src/pages/Auth0Callback';

export const Routes = (props) => (
  <div>
    <Route
      path="/"
      render={ props => <UserPage/> }
    />

    <Route
      path="/auth-callback"
      render={ (props) => <Auth0Callback {...props} /> }
    />
  </div>
);

export default Routes;