import React, { Component } from 'react';

import { makeEnhancedChildComponents } from 'src/util/component';

export class Layout extends Component {
  render() {
    const { showLogin, children } = this.props;

    const enhancedChildren = makeEnhancedChildComponents(children, this.props);

    return (
      <div>
        { showLogin &&
          <button onClick={ () => showLogin()}>Login</button>
        }

        {enhancedChildren}
      </div>
    );
  }
}

export default Layout;