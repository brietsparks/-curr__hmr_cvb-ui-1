export const evaluatePropsAgainstFilters = (
  props,
  filterCallbacks = [],
  getFilterState = (props) => props.projectTreeViewState.filters
) => {
  let meetsFilterCriteria = true;

  const filters = getFilters(props);

  filterCallbacks.forEach(cb => {
    if (meetsFilterCriteria) {
      meetsFilterCriteria = cb(props, filters);
    }
  });

  return meetsFilterCriteria;
};