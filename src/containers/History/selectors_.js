import { getProjectTreeViewSubstate } from 'src/substates/projectTreeView/selectors';

// get the data returned by the apollo query
export const getProjectsFromProps = props => {
  return props.data.getProjectsByUserId;
};

// get an array of skills from a contribution
export const getSkillsFromContribution = ({ contribution }) => {
  const skills = [];

  contribution.utilizations.forEach(utilization => {
    skills.push(utilization.skill);
  });

  return skills;
};

// get an array of skills from a project
export const getSkillsFromProject = ({ project }) => {
  let skills = [];

  project.contributions.forEach(contribution => {
    const contributionSkills = getSkillsFromContribution({ contribution });
    skills = skills.concat(contributionSkills);
  });

  return skills;
};

// get applied skills filters from the projectTreeView substate
export const getAppliedSkillFilters = props => {
  return getProjectTreeViewSubstate(props).filters.skills;
};


// check if an array of skills contains a skill that matches one of the filters
export const containsAFilteredSkill = ({ skills, skillFilters }) => {
  const criteriaSkillIds = skillFilters.map(sf => sf.skill_id);
  return skills.filter(skill => criteriaSkillIds.includes(skill.id));
};

export const applyfiltersToProjects = ({
  projectArray,
  skillFilters
}) => {
  projectArray.forEach(project => {
    const projectSkills = getSkillsFromProject({ project });
    const projectSkillFilters = skillFilters.filter(sf => sf.projectId === project.id);

    const projectMatched = containsAFilteredSkill({
      skills: projectSkills,
      skillFilters: projectSkillFilters
    });

    if (projectMatched) {

    }

  })
};
