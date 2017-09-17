import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  static propTypes = {
    currentUrlPath: PropTypes.string.isRequired
  };

  componentDidMount() {
    if (!this.props.user.initialized) {
      this.props.initializeUser();
    }
  }

  render() {
    const { user, children, showLogin, logout, currentUrlPath } = this.props;

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
const mapDispatchToProps = (dispatch, ownProps ) => {
  const { currentUrlPath } = ownProps;

  return {
    initializeUser: () => dispatch(initializeUser()),
    showLogin: (urlPath) => dispatch(showAuth0({ onSuccessRedirect: urlPath || currentUrlPath })),
    logout: (urlPath) => dispatch(logoutAction({ onSuccessRedirect: urlPath || currentUrlPath }))
  };
};

export const AuthContainerWithState = connect(mapStateToProps, mapDispatchToProps)(AuthContainer);

export default AuthContainerWithState;