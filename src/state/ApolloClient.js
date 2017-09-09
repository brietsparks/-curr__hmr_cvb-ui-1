import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { API_GATEWAY_ROOT_ENDPOINT } from 'src/parameters';
import { getAccessToken } from 'src/util/localStorage';

const networkInterface = createNetworkInterface({
  uri: API_GATEWAY_ROOT_ENDPOINT
});

networkInterface.use([{
  applyMiddleware(req, next) {
    req.options.headers = req.options.headers || {};

    const token = getAccessToken();
    req.options.headers.authorization = token ? `Bearer ${token}` : null;

    next();
  }
}]);

const initApolloClient = (initialState = {}) => new ApolloClient({
  initialState,
  dataIdFromObject: o => o.id,
  networkInterface,
  connectToDevTools: true,
});

export default initApolloClient;