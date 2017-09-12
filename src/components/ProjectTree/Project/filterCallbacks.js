export const ContainsNestedSkills = ({
  projectModel,
  skillFiltersModel
}) => () => {
  const skillIds = skillFiltersModel.getSkillIdsByProjectId(id);
  return projectModel.containsSkillsByIds(skillIds);
};