// takes an array of projects and recursively makes array of project trees
const ProjectTrees = ({ projectArray, parentId = null }) => {

  // a seed is a root node that does not have its children attached yet
  let seeds = projectArray.filter(
    p => p.parent_id === parentId ? String(parentId) : null
  );

  // build each tree from its seed
  const trees = [];
  seeds.forEach(seed => {
    const tree = Object.assign({}, seed);

    tree.childProjects = ProjectTrees({
      projectArray,
      parentId: parseInt(seed.id)
    });

    trees.push(tree);
  });


  return trees;
};

export default ProjectTrees;