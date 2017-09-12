export default class SkillFilters {
  constructor({ data }) {
    Object.keys(data).forEach(k => this[k] = data[k]);
    this._data = data;
  }

  // get skill filters that have any of the passed in project ids
  getFiltersByProjectIds(projectIds) {
    return this._data.filter(sf => projectIds.includes(sf.projectId));
  }

  // get the skill ids applied to projects, given their project ids
  getSkillIdsByProjectIds(projectIds) {
    return this.getFiltersByProjectIds(projectIds).map(sf => sf.skillId);
  }
}