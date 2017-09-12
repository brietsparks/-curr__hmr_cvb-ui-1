import React from 'react';

import ProjectTree from '../Project';

const ProjectTreeList = ({ trees, addSkillFilter, removeSkillFilter }) => {
  const projectComponents = trees.map(project => {

    return (
      <li key={project.id}>
        <ProjectTree
          {...project}

          addSkillFilter={addSkillFilter}
          removeSkillFilter={removeSkillFilter}
        />
      </li>
    )
  });

  return (
    <ul>
      { projectComponents }
    </ul>
  );

};

export default ProjectTreeList;