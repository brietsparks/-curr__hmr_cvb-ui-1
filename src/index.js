import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import { apolloClient, store } from './state';


const rootEl = document.getElementById('root');
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={apolloClient} store={store}>
        <MuiThemeProvider>
          <Component/>
        </MuiThemeProvider>
      </ApolloProvider>
    </AppContainer>,
    rootEl
  );

render(App);
if (module.hot) module.hot.accept('./App', () => render(App));
