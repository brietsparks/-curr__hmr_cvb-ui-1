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

export const getSkillsFromContribution = ({ contribution }) => {
  const skills = [];

  contribution.utilizations.forEach(utilization => {
    skills.push(utilization.skill);
  });

  return skills;
};

// recursively get skills of all nodes of the project tree
export const getSkillsFromProjectTree = ({ projectTree }) => {
  let skills = [];

  if (projectTree.contributions) {
    projectTree.contributions.forEach(contribution => {
      const contributionSkills = getSkillsFromContribution({ contribution });
      skills = skills.concat(contributionSkills);
    });
  }

  if (projectTree.childProjects) {
    projectTree.childProjects.forEach(childProject => {
      const childProjectSkills = getSkillsFromProjectTree({ projectTree: childProject });
      skills = skills.concat(childProjectSkills);
    });
  }

  skills = uniqBy(skills, sk => sk.id);

  return skills;
};

// whether the array includes all items from requiredItems array
export const arrayIncludesAll = ({ array, requiredItems }) => {
  return requiredItems.every(requiredItem => array.includes(requiredItem))
};



export const applyFiltersToProjectTree = ({ projectTree, skillFilters }) => {

  // array of the skill ids of the filters applied to this projectTree
  let filterSkillIds;
  const projectSkillFilters = skillFilters.filter(sf => sf.projectId === projectTree.id);
  filterSkillIds = projectSkillFilters.map(sf => sf.skillId);

  // array of the skill ids of the contributions
  let projectTreeSkillIds;
  const projectTreeSkills = getSkillsFromProjectTree({ projectTree });
  projectTreeSkillIds = projectTreeSkills.map(skill => skill.id);

  // whether the skill ids of the project tree contain all skill ids of any of the filters
  projectTree.matchesFilter = arrayIncludesAll({
    array: projectTreeSkillIds,
    requiredItems: filterSkillIds,
  });

  if (projectTree.contributions) {
    projectTree.contributions.forEach(contribution => {
      if (projectTree.matchesFilter) {
        let contributionSkillIds;
        const contributionSkills = getSkillsFromContribution({ contribution });
        contributionSkillIds = contributionSkills.map(contribution => contribution.id);

        contribution.matchesFilter = arrayIncludesAll({
          array: contributionSkillIds,
          requiredItems: filterSkillIds
        });
      } else {
        contribution.matchesFilter = false;
      }
    });
  }

  // recursively apply filters to child projects
  if (projectTree.childProjects) {
    projectTree.childProjects.forEach(childProject => {
      if (projectTree.matchesFilter) {
        applyFiltersToProjectTree({
          projectTree: childProject,
          skillFilters
        })
      } else {
        childProject.matchesFilter = false;
      }
    });
  }

  return projectTree;
};
