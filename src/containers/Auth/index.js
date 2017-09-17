import React, { Component } from 'react';
import { connect } from 'react-redux';

// state
import { getAuthState } from 'src/state/auth/selectors';
import { showAuth0, logout } from 'src/state/auth/actions';

// container
import { getUserScopes, checkUserIsAuthenticated } from './selectors';

// components
import AuthContextProvider from 'src/components/Auth/ContextProvider';

// util
import { makeEnhancedChildComponents } from 'src/util/component';

export class AuthContainer extends Component {

  componentDidMount() {
  }

  render() {

    const { user } = this.props;

    const { children, showLogin, logoutAction } = this.props;

    const childrenWithAuthActions =
      makeEnhancedChildComponents(children, { showLogin, logoutAction })

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