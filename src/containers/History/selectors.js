import { getProjectTreeViewSubstate } from 'src/substates/projectTreeView/selectors';
import ProjectModel from './ProjectModel';
import ContributionModel from './ContributionModel';

import { uniqBy, cloneDeep } from 'lodash';

// get the data returned by the apollo query
export const getProjectsFromProps = props => {
  return props.data.getProjectsByUserId;
};

// get applied skills filters from the projectTreeView substate
export const getAppliedSkillFilters = props => {
  return getProjectTreeViewSubstate(props).filters.skills;
};
