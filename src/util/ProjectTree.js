const ProjectTrees = ({ projectArray, parentId = null }) => {

  const roots = projectArray.filter(p => p.id === parentId);

  roots.forEach(root => {
    root.childProjects = ProjectTrees({
      projectArray,
      parentId: rootProject.id
    });
  });

  return roots;
};

export default ProjectTrees;