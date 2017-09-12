export default class SkillFiltersModel {
  constructor({ skillFiltersData = [] }) {
    const _skillFiltersData = skillFiltersData;
    this._skillFiltersData = _skillFiltersData;
  }

  // get skill filters for a project by its id
  getFiltersByProjectId(projectId) {
    return this._skillFiltersData.filter(sf => sf.projectId === projectId);
  }

  // get the skill ids applied to a project
  getSkillIdsByProjectId(projectId) {
    return this.getFiltersByProjectId(projectId).map(sf => sf.skillId);
  }
}