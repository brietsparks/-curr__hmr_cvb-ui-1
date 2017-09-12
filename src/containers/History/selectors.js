import { createSelector } from 'reselect';
// todo: create selectors

import { getProjectTreeViewState } from 'src/state/projectTreeView/selectors';

// get the data returned by the apollo query
export const getProjectsFromProps = props => {
  return props.data.getProjectsByUserId;
};

// get skills filters from the projectTreeView substate
export const getSkillFiltersFromProps = props => {
  return getProjectTreeViewState(props).filters.skills;
};
