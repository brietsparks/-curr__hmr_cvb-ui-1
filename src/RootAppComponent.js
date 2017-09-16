import React, { Component } from 'react';

import { ConnectedRouter } from 'react-router-redux';
import { Routes, history } from './routing';

export default class RootAppComponent extends Component {
  render() {
    return (
      <div>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </div>
    );
  }
}
