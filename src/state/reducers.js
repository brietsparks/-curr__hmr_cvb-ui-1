import projectTreeViewReducer from './projectTreeView/reducer';
import { stateKey as projectTreeViewKey } from './projectTreeView/constants';

export const reducers = {
  [projectTreeViewKey]: projectTreeViewReducer,
};

export default reducers;