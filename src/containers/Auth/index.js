import React, { Component } from 'react';
import { connect } from 'react-redux';

// state
import { getAuthState } from 'src/state/auth/selectors';
import { showAuth0, logout } from 'src/state/auth/actions';

// container
import { getUserScopes, checkUserIsAuthenticated } from './selectors';

// components
import AuthContextProvider from 'src/components/Auth/ContextProvider';

export class AuthContainer extends Component {

  componentDidMount() {
  }

  makeEnhancedChild(child) {
    const { showLogin, logoutAction } = this.props;

    return React.cloneElement(child, { showLogin, logoutAction })
  }

  render() {

    const { user } = this.props;

    const children = this.props.children;

    const childrenWithAuthActions =  children instanceof Array
      ? children.map(child => this.makeEnhancedChild(child))
      : this.makeEnhancedChild(children);

    return (
      <AuthContextProvider
        userIsAuthenticated={checkUserIsAuthenticated(user)}
        userScopes={getUserScopes(user)}
      >
        {childrenWithAuthActions}
      </AuthContextProvider>
    );
  }
}

const mapStateToProps = state => getAuthState(state);
const mapDispatchToProps = dispatch => {
  return {
    showLogin: () => dispatch(showAuth0()),
    logoutAction: (redirectRoute) => dispatch(logout({ route: redirectRoute }))
  };
};

export const AuthContainerWithState = connect(mapStateToProps, mapDispatchToProps)(AuthContainer);

export default AuthContainerWithState;