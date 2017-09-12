export const ContainsNestedSkills = ({
  projectModel,
  skillFiltersModel
}) => () => {
  const skillIds = skillFiltersModel.getSkillIdsByProjectId(projectModel.id);
  return projectModel.containsSkillsByIds(skillIds);
};