import projectTreeViewReducer from './projectTreeView/reducer';
import { substateKey as projectTreeViewKey } from './projectTreeView/constants';

export const reducers = {
  [projectTreeViewKey]: projectTreeViewReducer,
};