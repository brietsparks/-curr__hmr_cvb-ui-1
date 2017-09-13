import { uniqBy } from 'lodash';
import ProjectTreeNode from './AbstractProjectTreeNode';
import Contribution from './Contribution';

export default class Project extends ProjectTreeNode {
  constructor({ data, parentModel }) {
    super({ data, parentModel });

    this.childProjectModels = data.childProjects
      ? data.childProjects.map(childProject => {
        return new Project({
          data: childProject,
          parentModel: this
        })
      })
      : [];

    this.contributionModels = data.contributions
      ? data.contributions.map(contribution => {
        return new Contribution({
          data: contribution,
          parentModel: this
        })
      })
      : [];
  }

  getSkills() {
    let skills = [];

    this.contributionModels.forEach(cm => skills = skills.concat(cm.getSkills()));
    this.childProjectModels.forEach(cpm => skills = skills.concat(cpm.getSkills()));

    const unique = uniqBy(skills, skill => skill.id);

    this.sortSkills(unique);

    return unique;
  }

  getDescendantProjectById(id) {
    let project;

    const childProjectModels = this.childProjectModels || [];

    project = childProjectModels.find(
      projectModel => projectModel.id === id
    );

    if (project) {
      return project;
    }

    for (let i = 0; i < childProjectModels.length; i++) {
      project = childProjectModels[i].getDescendantProjectById(id);
      if (project) {
        return project;
      }
    }
  }

}