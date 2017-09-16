import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AuthContext extends Component {

  static childContextTypes = {
    userIsAuthenticated: PropTypes.bool,
    userScope: PropTypes.bool
  };

  getChildContext() {
    return {
      userIsAuthenticated: true,
      userScope: 'dummy scope'
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

};