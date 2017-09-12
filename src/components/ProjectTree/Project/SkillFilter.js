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
      <label key={skill.id}>

        {skill.canonical_name}


        <input type="checkbox" onChange={ e => {
          const skillId = skill.id;
          e.target.checked
            ? addSkillFilter({ projectId, skillId })
            : removeSkillFilter({ projectId, skillId })
        } }/>

      </label>
    )
  });

  return (
    <div>
      {checkBoxes}
    </div>
  );
};

export default SkillFilter;