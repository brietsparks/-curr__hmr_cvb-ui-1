import React from 'react';
import { Route } from 'react-router';

import SelfPage from 'src/pages/Self';
import UserPage from 'src/pages/User';
import Auth0Callback from 'src/pages/Auth0Callback';
import AboutPage from 'src/pages/About';

export const Routes = (props) => (
  <div>
      <Route
        path="/self"
        component={SelfPage}
      />

    <Route
      path='/user/:userId'
      component={UserPage}
    />

    <Route
      path="/auth-callback"
      render={ (props) => <Auth0Callback {...props} /> }
    />

    <Route
      path="/about"
      render={ props => <AboutPage/> }
    />
  </div>
);

export default Routes;