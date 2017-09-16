import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginFinalize } from 'src/state/auth';

class Callback extends Component {
  componentWillMount() {
    this.props.dispatch(loginFinalize(this.props.redirectRoute || '/'));
  }

  render() {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    };

    return (
      <div style={style}>
        <p>Logging in...</p>
        {/*<img src={loading} alt="loading"/>*/}
      </div>
    );
  }
}

const CallbackWithState = connect(state => ({}))(Callback);

export default CallbackWithState;
