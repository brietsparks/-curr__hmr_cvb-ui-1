import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';

import { apolloClient, store } from './state';


const rootEl = document.getElementById('root');
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={apolloClient} store={store}>
        <Component/>
      </ApolloProvider>
    </AppContainer>,
    rootEl
  );

render(App);
if (module.hot) module.hot.accept('./App', () => render(App));
