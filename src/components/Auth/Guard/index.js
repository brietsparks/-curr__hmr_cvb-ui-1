import React from 'react';
import withAuthContext from '../contextHOC';

export const AuthGuard = ({
  userIsAuthenticated,
  guestComponentInstance
}) => {
  return userIsAuthenticated
    ? <span>{ this.props.children }</span>
    : {guestComponentInstance}
};

export default withAuthContext(AuthGuard);