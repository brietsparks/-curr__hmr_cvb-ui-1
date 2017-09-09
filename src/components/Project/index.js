import React from 'react';

import ContributionList from 'src/components/ContributionList';
import ProjectTrees from 'src/components/ProjectTrees';

const Project = ({
  id, title, subtitle, contributions, childProjects
}) => {
  return (
    <div>
      <div>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>

      <div style={{marginLeft: 20}}>
        <ContributionList contributions={contributions} />
        <ProjectTrees trees={childProjects}/>
      </div>
    </div>
  )
};

export default Project;