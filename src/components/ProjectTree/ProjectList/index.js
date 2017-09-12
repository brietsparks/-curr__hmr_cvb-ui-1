import React from 'react';

import Project from '../Project';

const ProjectTreeList = ({ models, actions, filters }) => {

  const projectComponents = models.map(model => {
    return (
      <li key={model.id}>
        <Project
          model={model}
          actions={actions}
          filters={filters}
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