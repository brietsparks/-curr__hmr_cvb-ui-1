import { cloneDeep } from 'lodash';

import { actions as actionTypes } from './constants';

const defaultState = {
  user: {
    id: null,
    scope: null,
    initialized: false,
  },
};

const authReducer = (initialState = defaultState, action) => {
  const state = cloneDeep(initialState);
  const payload = action.payload;

  switch (action.type) {
    case actionTypes.user.SET.DEFAULT:
      state.user = payload;
      break;
  }

  return state;
};

export default authReducer;
