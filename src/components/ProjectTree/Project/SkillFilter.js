import React from 'react';

const SkillFilter = ({
  projectId,
  projectModel,
  skillFilters,
  addSkillFilter,
  removeSkillFilter
}) => {
  const filterableSkills = projectModel.getSkills() || [];

  const checkBoxes = filterableSkills.map(skill => {
    return (
      <p key={skill.id}>
        <label>
          <input type="checkbox" onChange={ e => {
            const skillId = skill.id;
            e.target.checked
              ? addSkillFilter({ projectId, skillId })
              : removeSkillFilter({ projectId, skillId })
          } }/>
          {skill.canonical_name}
        </label>
      </p>
    )
  });

  return (
    <div>
      {checkBoxes}
    </div>
  );
};

export default SkillFilter;