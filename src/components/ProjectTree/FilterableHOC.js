import React from 'react';

// functions
import { evaluateFilterCallbacks } from './util';
import { ContainsSkills } from './filterCallbacks';

export const FilterableHOC = Component => class Filterable extends React.Component {

  render() {
    const { model, filters } = this.props;

    // EVAL FILTERS
    const meetsFilterCriteria = evaluateFilterCallbacks([
      ContainsSkills({ model, skillFiltersModel: filters.skill })
    ]);

    if (meetsFilterCriteria) {
      return (
        <Component {...this.props} />
      );
    }

    return null;
  }
};

export default FilterableHOC;