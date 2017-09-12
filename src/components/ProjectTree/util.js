export const evaluateFilterCallbacks = (
  filterCallbacks = [],
) => {
  let meetsFilterCriteria = true;

  filterCallbacks.forEach(cb => {
    if (meetsFilterCriteria) {
      meetsFilterCriteria = cb();
    }
  });

  return meetsFilterCriteria;
};