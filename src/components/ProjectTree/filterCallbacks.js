export const ContainsSkills = ({
  model,
  skillFiltersModel
}) => () => {
  const ancestorIds = model.getAncestorIds();

  const skillIds = skillFiltersModel.getSkillIdsByProjectIds(ancestorIds);

  return model.containsSkillIds(skillIds);
};