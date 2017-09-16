import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { API_GATEWAY_ROOT_ENDPOINT } from 'src/parameters';

import { requestAuthorizationMiddleware } from './apollo/middleware';

const networkInterface = createNetworkInterface({
  uri: API_GATEWAY_ROOT_ENDPOINT
});

networkInterface.use([ requestAuthorizationMiddleware ]);

const initApolloClient = (initialState = {}) => new ApolloClient({
  initialState,
  dataIdFromObject: o => o.__typename + '.' + o.id,
  networkInterface,
  connectToDevTools: true,
});

export default initApolloClient;