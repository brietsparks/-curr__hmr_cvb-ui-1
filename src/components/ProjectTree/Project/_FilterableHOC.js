import React from 'react';

// functions
import { evaluateFilterCallbacks } from '../util';
import { ContainsSkills } from '../filterCallbacks';

export const FilterableHOC = ProjectComponent => class Filterable extends React.Component {

  render() {
    const { model, filters } = this.props;

    // EVAL FILTERS
    const meetsFilterCriteria = evaluateFilterCallbacks([
      ContainsSkills({ model, skillFiltersModel: filters.skill })
    ]);

    if (meetsFilterCriteria) {
      return (
        <ProjectComponent {...this.props} />
      );
    }

    return null;
  }
};

export default FilterableHOC;