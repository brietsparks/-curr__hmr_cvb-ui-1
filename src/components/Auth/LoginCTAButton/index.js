import React from 'react';
import PropTypes from 'prop-types';

export const LoginCTAButton = ({ showLogin }) => (
  <div>
    <button onClick={ () => showLogin() }>Login</button>
  </div>
);

export default LoginCTAButton;