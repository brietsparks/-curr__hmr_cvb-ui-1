import React from 'react';

// Components
import ContributionList from '../ContributionList';
import ProjectTreeList from '../ProjectList';
import SkillFilter from './SkillFilter';

// HOC
import Filterable from './FilterableHOC';

export const Project = ({
  actions,
  filters,
  appliedFilters,
  model,
}) => {

  const {
    id, title, subtitle,
    contributionModels = [],
    childProjectModels = [],
  } = model;

  const hasContributions = contributionModels.length > 0;
  const hasChildProjects = childProjectModels.length > 0;
  
  return (
    <div>
      <div>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>

      <div>
        <SkillFilter
          projectId={id}
          filterableSkills={model.getSkills()}
          addSkillFilter={actions.addSkillFilter}
          removeSkillFilter={actions.removeSkillFilter}
        />

        <div>
          { hasContributions &&
          <div>
            <p>Contributions</p>
            <ContributionList
              models={contributionModels}
              actions={actions}
            />
          </div>
          }

          { hasChildProjects &&
          <div>
            <p>Projects</p>
            <ProjectTreeList
              models={childProjectModels}
              actions={actions}
              filters={filters}
            />
          </div>
          }
        </div>
      </div>

    </div>
  );
};

export default Filterable(Project);
// export default (Project);