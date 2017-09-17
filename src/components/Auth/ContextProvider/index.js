import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AuthContextProvider extends Component {

  static childContextTypes = {
    userIsAuthenticated: PropTypes.bool,
    userScopes: PropTypes.arrayOf(PropTypes.string)
  };

  getChildContext() {
    const { userIsAuthenticated, userScopes } = this.props;

    return { userIsAuthenticated, userScopes };
  }

  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }

};