import React from 'react';

const FilterBySkills = ({
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

const handleCheckboxChange = ({ projectId, skillId, checked }) => {

};

export default FilterBySkills;