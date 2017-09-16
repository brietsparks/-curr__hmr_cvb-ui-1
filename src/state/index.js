import ApolloClient from './ApolloClient';
import Store from './Store';
import { stateKey as apolloStateKey } from './apollo/constants';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import { stateKey as routingStateKey } from 'src/state/routing/constants';
import { history } from 'src/routing';

export const apolloClient = ApolloClient();

export const store = Store({
  reducers: {
    [apolloStateKey]: apolloClient.reducer(),
    [routingStateKey]: routerReducer,
  },
  middleware: [
    apolloClient.middleware(),
    routerMiddleware(history)
  ]
});

