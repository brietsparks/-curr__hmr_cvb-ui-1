import decode from 'jwt-decode';

// auth0
import { webAuth } from 'src/auth0';

// routing
import { history } from 'src/routing';

// state
import { actions } from './constants';

// storage
import { getAccessToken } from 'src/util/localStorage';


const accessTokenKey = 'access_token';
const onAuthSuccessRedirectKey = 'login_redirect_route';


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

    const id = decoded ? decoded.sub : null;
    const initialized = true;

    dispatch(setUser({
      id,
      // scope: decoded.scope,
      initialized
    }));
  };
};

export const showAuth0 = ({ onSuccessRedirect }) => {
  localStorage.setItem(onAuthSuccessRedirectKey, onSuccessRedirect || '/');
  webAuth.authorize();
};

export const login = () => {
  return dispatch => {

    // parse the callback url
    webAuth.parseHash(window.location.hash, (err, parsed) => {

      if (parsed) {
        const { accessToken, expiresIn } = parsed;

        // set token
        localStorage.setItem(accessTokenKey, accessToken);

        // set expires
        let expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('expires_at', expiresAt);

        // initialize user
        dispatch(initializeUser(accessToken));

      } else if (err) {
        console.log(err);
      }

      // redirect
      const redirectPath = localStorage.getItem(onAuthSuccessRedirectKey);
      localStorage.removeItem(onAuthSuccessRedirectKey);
      history.replace(redirectPath);
    });
  }
};

export const logout = ({ onSuccessRedirect }) => {
  return dispatch => {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem('expires_at');

    dispatch(setUser({
      id: null,
      scope: null,
      initialized: true
    }));

    history.replace(onSuccessRedirect || '/');
  }
};
