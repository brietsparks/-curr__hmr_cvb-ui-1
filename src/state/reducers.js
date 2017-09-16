import projectTreeViewReducer from './projectTreeView/reducer';
import { stateKey as projectTreeViewKey } from './projectTreeView/constants';

import authReducer from './auth/reducer';
import { stateKey as authKey } from './auth/constants';


export const reducers = {
  [projectTreeViewKey]: projectTreeViewReducer,
  [authKey]: authReducer,
};

export default reducers;