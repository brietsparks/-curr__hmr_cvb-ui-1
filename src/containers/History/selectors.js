import { getProjectTreeViewSubstate } from 'src/substates/projectTreeView/selectors';
import ProjectModel from './ProjectModel';
import ContributionModel from './ContributionModel';

// get the data returned by the apollo query
export const getProjectsFromProps = props => {
  return props.data.getProjectsByUserId;
};

// get applied skills filters from the projectTreeView substate
export const getAppliedSkillFilters = props => {
  return getProjectTreeViewSubstate(props).filters.skills;
};

// return a deep-cloned project trees that have matchesFilter attribute on the nodes
export const applyfiltersToProjects = ({ projectArray, skillFilters }) => {
  const filteredProjectArray = [];

  projectArray.forEach(project => {
    const projectModel = new ProjectModel({ project });

    const filteredProject = projectModel.getFilteredProject({ skillFilters });

    filteredProjectArray.push(filteredProject);
  });

  return filteredProjectArray;
};
