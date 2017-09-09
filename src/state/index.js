import ApolloClient from 'src/state/ApolloClient';
import Store from 'src/state/Store';
import { substateKey as apolloStateKey } from 'src/substates/apollo/constants';

export const apolloClient = ApolloClient();

export const store = Store({
  reducers: {
    [apolloStateKey]: apolloClient.reducer(),
  },
  middleware: [
    apolloClient.middleware(),
  ]
});

