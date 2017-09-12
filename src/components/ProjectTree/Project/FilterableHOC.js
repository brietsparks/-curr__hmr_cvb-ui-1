import React from 'react';

// models
import ProjectModel from '../models/ProjectModel';
import SkillFiltersModel from '../models/SkillFiltersModel';

// functions
import { evaluateFilterCallbacks } from '../util';
import { ContainsNestedSkills } from './filterCallbacks';

export const FilterableHOC = ProjectComponent => class Filterable extends React.Component {

  render() {
    const { id, contributions, childProjects, viewState } = this.props;

    const projectModel = new ProjectModel({
      projectData: { id, contributions, childProjects }
    });

    const skillFiltersModel = new SkillFiltersModel({
      skillFiltersData: viewState.filters
    });

    // EVAL FILTERS
    const meetsFilterCriteria = evaluateFilterCallbacks([
      ContainsNestedSkills({ projectModel, skillFiltersModel })
    ]);

    if (meetsFilterCriteria) {
      return (
        <ProjectComponent
          {...this.props}
          projectModel={projectModel}
        />
      );
    }

    return null;
  }
};

export default FilterableHOC;