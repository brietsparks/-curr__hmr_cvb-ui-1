import ProjectModel from '../models/ProjectModel';
import SkillFiltersModel from '../models/SkillFiltersModel';

export const containsNestedSkills = (props, filterState) => {
  const { id, contributions, childProjects } = props;

  const projectModel = new ProjectModel({
    projectData: { id, contributions, childProjects }
  });

  const skillFiltersModel = new SkillFiltersModel({
    skillFiltersData: filterState
  });

  const skillIds = skillFiltersModel.getSkillIdsByProjectId(id);

  return projectModel.containsSkillsByIds(skillIds);
}