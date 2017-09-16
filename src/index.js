import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppContainer as HotloaderContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';

import RootAppComponent from './RootAppComponent';
import { apolloClient, store } from './state';


const rootEl = document.getElementById('root');
const render = Component =>
  ReactDOM.render(
    <HotloaderContainer>
      <ApolloProvider client={apolloClient} store={store}>
        <MuiThemeProvider>
          <Component/>
        </MuiThemeProvider>
      </ApolloProvider>
    </HotloaderContainer>,
    rootEl
  );

render(RootAppComponent);

if (module.hot) {
  module.hot.accept(
    './RootAppComponent',
    () => render(RootAppComponent)
  );
}