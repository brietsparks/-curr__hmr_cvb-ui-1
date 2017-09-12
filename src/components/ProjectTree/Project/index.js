import React from 'react';

// Components
import ContributionList from '../ContributionList';
import ProjectTreeList from '../ProjectList';
import SkillFilter from './SkillFilter';

// HOC
import Filterable from './FilterableHOC';

export const Project = (props) => {
  const {
    actions,
    viewState,
    projectModel,

    id, title, subtitle,
    contributions = [],
    childProjects = [],
  } = props;

  const hasContributions = contributions.length > 0;
  const hasChildProjects = childProjects.length > 0;

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>

      <div>
        <SkillFilter
          projectId={id}
          filterableSkills={projectModel.getSkills()}
          addSkillFilter={actions.addSkillFilter}
          removeSkillFilter={actions.removeSkillFilter}
        />

        <div>
          { hasContributions &&
          <div>
            <p>Contributions</p>
            <ContributionList
              contributions={contributions}
              actions={actions}
              viewState={viewState}
            />
          </div>
          }

          { hasChildProjects &&
          <div>
            <p>Projects</p>
            <ProjectTreeList
              trees={childProjects}
              actions={actions}
              viewState={viewState}
            />
          </div>
          }
        </div>
      </div>

    </div>
  );
};

export default Filterable(Project);