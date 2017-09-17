import decode from 'jwt-decode';

// auth0
import { webAuth } from 'src/auth0';

// routing
import { history } from 'src/routing';

// state
import { actions, accessTokenKey } from './constants';

// util
import { getAccessToken } from 'src/util/localStorage';

export const setUser = ({ id, scope, initialized }) => {
  return {
    type: actions.user.SET.DEFAULT,
    payload: { id, scope, initialized }
  }
};

export const initializeUser = (accessToken = null) => {
  return dispatch => {
    const accessToken = accessToken || localStorage.getItem(accessTokenKey);

    const decoded = accessToken ? decode(accessToken) : null;

    dispatch(setUser({
      id: decoded.sub,
      // scope: decoded.scope,
      initialized: true
    }));
  };
};

export const showAuth0 = () => {
  webAuth.authorize();
};

export const login = ({ route }) => {
  return dispatch => {

    // parse the callback url
    webAuth.parseHash(window.location.hash, (err, authResult) => {
      const { accessToken, expiresIn } = authResult;

      if (authResult && accessToken) {
        // set token
        localStorage.setItem(accessTokenKey, accessToken);

        // set expires
        let expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('expires_at', expiresAt);

        // initialize user
        dispatch(initializeUser(accessToken));

        // redirect
        history.replace(route);
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }
};

export const logout = ({ route }) => {
  return dispatch => {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem('expires_at');

    dispatch(setUser({
      id: null,
      scope: null,
      initialized: true
    }));

    history.replace(route);
  }
};
