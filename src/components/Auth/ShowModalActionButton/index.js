import React from 'react';
import PropTypes from 'prop-types';

export const ShowModalActionButton = ({ showModal }) => (
  <div>
    <button onClick={ () => showModal() }>Login</button>
  </div>
);

export default ShowModalActionButton;