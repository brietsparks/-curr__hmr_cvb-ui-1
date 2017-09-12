import React from 'react';

const SkillFilter = ({
  projectId,
  filterableSkills = [],
  addSkillFilter,
  removeSkillFilter
}) => {
  const checkBoxes = filterableSkills.map(skill => (
    <label key={skill.id}>

      {skill.canonical_name}

      <input type="checkbox" onChange={ e => {
        const skillId = skill.id;
        e.target.checked
          ? addSkillFilter({ projectId, skillId })
          : removeSkillFilter({ projectId, skillId })
      } }/>

    </label>
  ));

  return (
    <div>
      {checkBoxes}
    </div>
  );
};

export default SkillFilter;