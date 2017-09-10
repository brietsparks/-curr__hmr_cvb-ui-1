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

export const applyfiltersToProjects = ({
  projectArray,
  skillFilters
}) => {
  projectArray.forEach(project => {
    const projectModel = new ProjectModel({ project });
    if (projectModel.)

    /*
    const projectSkills = getSkillsFromProject({ project });
    const projectSkillFilters = skillFilters.filter(sf => sf.projectId === project.id);

    const projectMatched = containsAFilteredSkill({
      skills: projectSkills,
      skillFilters: projectSkillFilters
    });

    if (projectMatched) {

    }
    */
  })
};
