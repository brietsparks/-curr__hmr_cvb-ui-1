import React from 'react';

import Project from '../Project';

const ProjectTreeList = ({ models, actions, viewState }) => {

  const projectComponents = models.map(model => {
    return (
      <li key={model.id}>
        <Project
          model={model}
          actions={actions}
          viewState={viewState}
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