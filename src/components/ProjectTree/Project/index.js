import React from 'react';

import ProjectHeader from './Header';
import ContributionList from '../ContributionList';
import ProjectTreeList from '../ProjectList';

import FilterBySkills from 'src/components/FilterBySkills';

import { evaluatePropsAgainstFilters } from '../util';
import { containsNestedSkills } from './filterCallbacks';

export const Project = (props) => {
  const {
    dispatch,

    id,
    title,
    subtitle,
    contributions = [],
    childProjects = [],

    viewState,
  } = props;

  const meetsFilterCriteria = evaluatePropsAgainstFilters(props, [
    containsNestedSkills
  ]);

  if (!meetsFilterCriteria) {
    return null;
  }

  const hasContributions = contributions.length > 0;
  const hasChildProjects = childProjects.length > 0;

  return (
    <div>
      <ProjectHeader title={title} subtitle={subtitle} />

      <div>
        <div>
          <FilterBySkills
            projectId={id}
            // filterableSkills={projectModel.getSkills()}
            // dispatch={dispatch}
          />
        </div>

        <div>
          { hasContributions &&
          <div>
            <p>Contributions</p>
            <ContributionList
              contributions={contributions}
              dispatch={dispatch}
              viewState={viewState}
            />
          </div>
          }

          { hasChildProjects &&
          <div>
            <p>Projects</p>
            <ProjectTreeList
              trees={childProjects}
              dispatch={dispatch}
              viewState={viewState}

              // addSkillFilter={addSkillFilter}
              // removeSkillFilter={removeSkillFilter}
            />
          </div>
          }
        </div>
      </div>

    </div>
  );
};

export default Project;