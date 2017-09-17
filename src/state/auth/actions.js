import decode from 'jwt-decode';
import { webAuth } from 'src/auth0';

import { actions, accessTokenKey } from './constants';

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

    history.replace(route);
  }
};
