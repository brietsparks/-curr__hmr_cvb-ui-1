export const ContainsNestedSkills = ({
  projectModel,
  skillFiltersModel
}) => () => {
  const skillIds = skillFiltersModel.getSkillIdsByProjectId(projectModel.id);

  const contains = projectModel.containsSkillIds(skillIds);

  console.log(skillIds, projectModel.getSkills());

  console.log(contains);
  return contains;
};