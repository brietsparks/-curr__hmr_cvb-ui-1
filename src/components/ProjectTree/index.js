import React from 'react';

import ContributionList from 'src/components/ContributionList';
import ProjectTreeList from 'src/components/ProjectTreeList';
import FilterBySkills from 'src/components/FilterBySkills';

const ProjectTree = ({
  id,
  title,
  subtitle,
  contributions = [],
  childProjects = [],

  filterableSkills,
  addSkillFilter,
  removeSkillFilter,
}) => {

  const hasContributions = contributions.length > 0;
  const hasChildProjects = childProjects.length > 0;

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>

      <div>
        <div>
          <FilterBySkills
            projectId={id}
            filterableSkills={filterableSkills}
            addSkillFilter={addSkillFilter}
            removeSkillFilter={removeSkillFilter}
          />
        </div>

        <div>
          { hasContributions &&
          <div>
            <p>Contributions</p>
            <ContributionList contributions={contributions} />
          </div>
          }

          { hasChildProjects &&
          <div>
            <p>Projects</p>
            <ProjectTreeList trees={childProjects}/>
          </div>
          }
        </div>
      </div>

    </div>
  )
};

export default ProjectTree;