import React from 'react';

import ProjectTree from 'src/components/ProjectTree';

const ProjectTreeList = ({ trees }) => {
  const projectComponents = trees.map(project => (
    <li key={project.id}>
      <ProjectTree {...project} />
    </li>
  ));

  return (
    <ul>
      { projectComponents }
    </ul>
  );

};

export default ProjectTreeList;