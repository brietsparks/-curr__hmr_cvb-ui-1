import { createSelector } from 'reselect';
// todo: create selectors

import { getProjectTreeViewState } from 'src/state/projectTreeView/selectors';

// get the data returned by the apollo query
export const getProjectsFromProps = props => {
  return props.data ? props.data.getProjectsByUserId : undefined;
};

// get skills filters from the projectTreeView substate
export const getSkillFiltersFromState = state => {
  return getProjectTreeViewState(state).filters.skills;
};
