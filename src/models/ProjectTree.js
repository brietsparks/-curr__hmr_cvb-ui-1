import { cloneDeep } from 'lodash';

import Project from './Project';

// pass in an array of projects (i.e. data from state)
export const createModelTree = (projectArray, root = {}, asCopy = true) => {
  root.isRoot = true;
  root.childProjects = createDataTrees({
    projectArray: asCopy ? cloneDeep(projectArray) : projectArray
  });

  return new Project({ data: root });
};

export default createModelTree;


// pass in an array of projects (i.e. data from state)
export const createDataTrees = ({ projectArray, parentId = null }) => {

  // a seed is a root node that does not have its children attached yet
  let seeds = projectArray.filter(
    p => p.parent_id === parentId ? String(parentId) : null
  );

  // build each tree from its seed
  const trees = [];
  seeds.forEach(seed => {
    const tree = Object.assign({}, seed);

    tree.childProjects = createDataTrees({
      projectArray,
      parentId: parseInt(seed.id)
    });

    trees.push(tree);
  });

  return trees;
};