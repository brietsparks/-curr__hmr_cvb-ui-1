import ContributionModel from './ContributionModel';

export default class ProjectModel {
  constructor({ projectData, parentModel = null }) {
    if (!projectData) {
      throw new Error('Project model requires projectData object literal')
    }

    // _projectData for internal use
    const _projectData = projectData;
    this._projectData = _projectData;

    this.parentModel = parentModel;

    this.childProjectModels = _projectData.childProjects
      ? _projectData.childProjects.map(childProject => {
          return new ProjectModel({
            projectData: childProject,
          })
        })
      : [];

    this.contributionModels = _projectData.contributions
      ? _projectData.contributions.map(contribution => {
          return new ContributionModel({
            contributionData: contribution,
            parentModel: this
          })
        })
      : [];
  }

  getDescendantProjectById(id) {
    let project;

    const childProjectModels = this.childProjectModels || [];

    project = childProjectModels.find(
      projectModel => projectModel.getId() === id
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

  getSkills() {
    let skills = [];

    this.contributionModels.forEach(cm => skills = skills.concat(cm.getSkills()));
    this.childProjectModels.forEach(cpm => skills = skills.concat(cpm.getSkills()));

    return skills;
  }

  getSkillIds() {
    return this.getSkills().map(skill => skill.id);
  }

  containsSkillsById(skillIds) {
    skillIds.every(skillId => this.getSkillIds().includes(skillId));
  }

  applyFilter(cb) {

  }

  getId() {
    return this._projectData.id;
  }

}