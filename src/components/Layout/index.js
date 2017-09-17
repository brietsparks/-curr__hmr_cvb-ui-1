import React, { Component } from 'react';

import { makeEnhancedChildComponents } from 'src/util/component';

import Header from './Header';

export class Layout extends Component {
  render() {
    const { showLogin, logout, userIsAuthenticated, children } = this.props;

    const enhancedChildren = makeEnhancedChildComponents(children, this.props);

    return (
      <div>
        <Header
          userIsAuthenticated={userIsAuthenticated}
          showLogin={showLogin}
          logout={logout}
        />

        {enhancedChildren}
      </div>
    );
  }
}

export default Layout;