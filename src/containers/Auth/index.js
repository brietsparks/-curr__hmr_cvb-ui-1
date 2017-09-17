import React, { Component } from 'react';
import { connect } from 'react-redux';

// state
import { getAuthState } from 'src/state/auth/selectors';
import { initializeUser, showAuth0, logout as logoutAction } from 'src/state/auth/actions';

// container
import { getUserScopes, checkUserIsAuthenticated } from './selectors';

// components
import AuthContextProvider from 'src/components/Auth/ContextProvider';

// util
import { makeEnhancedChildComponents } from 'src/util/component';

export class AuthContainer extends Component {

  componentDidMount() {
    console.log(this.props);
    if (!this.props.user.initialized) {
      this.props.initializeUser();
    }
  }

  render() {
    const { user, children, showLogin, logout } = this.props;

    const childrenWithAuthActions =
      makeEnhancedChildComponents(children, { showLogin, logout });

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
    initializeUser: () => dispatch(initializeUser()),
    showLogin: () => dispatch(showAuth0()),
    logout: (redirectRoute) => dispatch(logoutAction({ route: redirectRoute }))
  };
};

export const AuthContainerWithState = connect(mapStateToProps, mapDispatchToProps)(AuthContainer);

export default AuthContainerWithState;