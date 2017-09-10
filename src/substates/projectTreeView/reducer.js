import { cloneDeep } from 'lodash';

import { actions as actionTypes } from './constants';

const defaultState = {

  filters: {
    skills: []
  }

};

const projectTreeViewReducer = (initialState = defaultState, action = {}) => {
  const state = cloneDeep(initialState);
  const payload = action.payload;

  switch (action.type) {
    case actionTypes.filters.skills.ADD:
      state.filters.skills.push(payload);
      break;
    case actionTypes.filters.skills.REMOVE:
      // todo: filter by skillId and projectId and remove
      break;
  }

  return state;
};

export default projectTreeViewReducer;