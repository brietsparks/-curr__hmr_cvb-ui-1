import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';

import { reducers as substateReducers } from './reducers';

const initStore = ({initialState = {}, reducers = {}, middleware}) => {

  Object.assign(reducers, substateReducers);
  const rootReducer = combineReducers(reducers);

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, ...middleware))
  );
};

export default initStore;