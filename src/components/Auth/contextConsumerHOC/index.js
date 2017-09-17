import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const withAuthContext = Component => class WithAuthContext extends Component {

  static contextTypes = {
    userIsAuthenticated: PropTypes.bool,
    userScopes: PropTypes.arrayOf(PropTypes.string)
  };

  render() {
    const { userIsAuthenticated, userScopes } = this.context;

    return (
      <Component
        {...this.props}
        userIsAuthenticated={userIsAuthenticated}
        userScopes={userScopes}
      />
    )
  }
};

export default withAuthContext;