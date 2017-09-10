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

// recursively get skills of all nodes of the project tree
export const getSkillsFromProjectTree = ({ projectTree }) => {
  let skills = [];

  if (projectTree.contributions) {
    projectTree.contributions.forEach(contribution => {
      contribution.utilizations.forEach(utilization => {
        skills.push(utilization.skill);
      })
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

export const applyFiltersToProjectTree = ({ projectTree, skillFilters }) => {
  // the filters applied to this projectTree
  const projectSkillFilters = skillFilters.filter(sf => sf.projectId === projectTree.id);

  // the skill ids of the filters
  const filterSkillIds = projectSkillFilters.map(sf => sf.skillId);

  // array of the skill ids of the contributions
  const projectTreeSkills = getSkillsFromProjectTree({ projectTree });
  const projectTreeSkillIds = projectTreeSkills.map(skill => skill.id);

  // whether the skill ids of the project tree contain an skill id of one of the filters
  projectTree.matchesFilter = projectTreeSkillIds.some(skillId => filterSkillIds.includes(skillId));

  // recursively apply filters to child projects
  projectTree.childProjects.forEach(childProject => {
    applyFiltersToProjectTree({
      projectTree: childProject,
      skillFilters
    })
  });

  return projectTree;
};

export const getFilteredProjectArray_ = ({ projects, skillFilters }) => {

  const defaultMatchValue = !skillFilters || skillFilters.length === 0;

  // the return data
  let newProjectArray = cloneDeep(projects);

  // console.log(newProjectArray)

  newProjectArray.forEach(project => {

    // default value
    project.matchesFilter = defaultMatchValue;

    // an array of skill filter objects which are applied to the project
    const projectSkillFilters = skillFilters.filter(sf => sf.projectId === project.id);

    // an array of the skill ids by which to filter
    const projectFilteredSkillIds = projectSkillFilters.map(sf => sf.skillId);

    project.contributions.forEach(contribution => {

      contribution.matchesFilter = defaultMatchValue;

      if (false === defaultMatchValue) {


        // get all the skills of the contribution
        const skills = [];
        contribution.utilizations.forEach(utilization => {
          skills.push(utilization.skill);
        });

        // an array of the ids each skill
        const skillIds = skills.map(skill => skill.id);

        // whether any of the skillIds are one of the filtered skill ids
        const matches = skillIds.some(skillId => projectFilteredSkillIds.includes(skillId));

        // set it on the contribution
        contribution.matchesFilter = matches;

        // set it on the project if true
        if (matches) {
          project.matchesFilter = true;
        }
      }
    });
  });

  return newProjectArray;
};

// return a deep-cloned project trees that have matchesFilter attribute on the nodes
export const applyfiltersToProjects_ = ({ projectArray, skillFilters }) => {
  const filteredProjectArray = [];

  projectArray.forEach(project => {
    const projectModel = new ProjectModel({ project });

    const filteredProject = projectModel.getFilteredProject({ skillFilters });

    filteredProjectArray.push(filteredProject);
  });

  return filteredProjectArray;
};
