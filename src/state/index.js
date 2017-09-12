import ApolloClient from './ApolloClient';
import Store from './Store';
import { stateKey as apolloStateKey } from './apollo/constants';

export const apolloClient = ApolloClient();

export const store = Store({
  reducers: {
    [apolloStateKey]: apolloClient.reducer(),
  },
  middleware: [
    apolloClient.middleware(),
  ]
});

