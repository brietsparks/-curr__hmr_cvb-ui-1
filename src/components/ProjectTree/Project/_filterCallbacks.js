export const ContainsNestedSkills = ({
  projectModel,
  skillFiltersModel
}) => () => {
  const ancestorIds = projectModel.getAncestorIds();

  const skillIds = skillFiltersModel.getSkillIdsByProjectIds(ancestorIds);

  return projectModel.containsSkillIds(skillIds);
};