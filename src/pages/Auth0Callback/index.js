import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login as loginAction } from 'src/state/auth/actions';

class Callback extends Component {
  componentWillMount() {
    // this.props.dispatch(login(this.props.redirectRoute || '/'));

    this.props.login();
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

const mapStateToProps = state => (state);
const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(loginAction())
  }
};


const CallbackWithState = connect(mapStateToProps, mapDispatchToProps)(Callback);

export default CallbackWithState;
