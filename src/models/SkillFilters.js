export default class SkillFilters {
  constructor({ data }) {
    Object.keys(data).forEach(k => this[k] = data[k]);
    this._data = data;
  }

  // get skill filters for a project by its id
  getFiltersByProjectId(projectId) {
    return this._data.filter(sf => sf.projectId === projectId);
  }

  // get the skill ids applied to a project
  getSkillIdsByProjectId(projectId) {
    return this.getFiltersByProjectId(projectId).map(sf => sf.skillId);
  }
}