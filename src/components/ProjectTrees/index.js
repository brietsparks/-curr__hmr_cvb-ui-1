import React from 'react';

import Project from 'src/components/Project';

const ProjectTrees = ({ trees }) => {

  const projectComponents = trees.map(project => (
    <li key={project.id}>
      <Project {...project} />
    </li>
  ));

  return (
    <div>
      <ul>
        { projectComponents }
      </ul>
    </div>

  )
};

export default ProjectTrees;