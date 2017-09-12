import { uniqBy } from 'lodash';
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

    return uniqBy(skills, skill => skill.id);
  }

  getSkillIds() {
    return this.getSkills().map(skill => skill.id);
  }

  containsSkillsByIds(skillIds) {
    return skillIds.every(skillId => this.getSkillIds().includes(skillId));
  }

  applyFilters(cb, matchCb, mismatchCb) {
    if (cb(this)) {
      matchCb(this);
    } else {
      mismatchCb(this);
    }
  }

  recursiveMap(conditionCb, recurseCb, terminatingCb) {
    if (conditionCb(this)) {
      recurseCb(this);
    } else {
      terminatingCb(this);
    }
  }

  /** SIMPLE GETTERS */
  getAttribute(attribute) {
    if (!this._projectData.hasOwnProperty(attribute)) {
      throw Error(`In ProjectModel, projectData does not contain attribute "${attribute}"`);
    }

    return this._projectData[attribute];
  }

  getAttributes(attributes = []) {
    const map = {};

    if (!attributes) {
      throw new Error('ProjectModel get method expects an array of project attribute names to get');
    }

    attributes.forEach(attribute => {
      map[attribute] = this.getAttribute(attribute);
    });

    return map;
  }

  getId() {
    const id = this._projectData.id;

    if (!id) {
      throw new Error('Id not set on ProjectModel.')
    }

    return id;
  }

  getParent() {
    return this.parentModel;
  }

  getChildProjectModels() {
    return this.childProjectModels;
  }

  getContributionModels() {
    return this.contributionModels;
  }

}