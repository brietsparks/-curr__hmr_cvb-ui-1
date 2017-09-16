import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const withAuthContext = Component => class WithAuthContext extends Component {

  static contextTypes = {
    userIsAuthenticated: PropTypes.bool,
    userScope: PropTypes.bool
  };

  render() {
    const { userIsAuthenticated, userScope } = this.context;

    return (
      <Component
        {...this.props}
        userIsAuthenticated={userIsAuthenticated}
        userScope={userScope}
      />
    )
  }
};

export default withAuthContext;