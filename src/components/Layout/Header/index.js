import React from 'react';

import withAuthContext from 'src/components/Auth/contextConsumerHOC';

export class Header extends React.Component {
  render() {
    const { userIsAuthenticated, showLogin, logout } = this.props;

    return (
      <div>
        { !userIsAuthenticated && showLogin &&
        <button onClick={ () => showLogin() }>Login</button>
        }

        { userIsAuthenticated && logout &&
        <button onClick={ () => logout() }>Logout</button>
        }
      </div>
    );
  }
}

export default withAuthContext(Header);