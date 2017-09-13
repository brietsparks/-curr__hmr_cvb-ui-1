export default class AbstractProjectTreeNode {
  constructor({ data, parentModel }) {
    Object.keys(data).forEach(k => this[k] = data[k]);
    this._data = data;
    this.parentModel = parentModel;
  }
  
  sortSkills(skills) {
    return skills.sort((s1, s2) => {
      if(s1.canonical_name < s2.canonical_name) return -1;
      if(s1.canonical_name > s2.canonical_name) return 1;
      return 0;
    })
  }

  getAncestorModels() {
    let ancestors = [];

    const parent = this.parentModel;

    if (parent) {
      ancestors = [parent, ...parent.getAncestorModels()];
    }

    return ancestors;
  }

  getAncestorIds() {
    return this.getAncestorModels().map(ancestor => ancestor.id);
  }

  getAttributes(attributes = []) {
    const map = {};

    if (!attributes) {
      throw new Error('ProjectTreeNode model get() method expects an array of project attribute names');
    }

    attributes.forEach(attribute => {
      map[attribute] = this[attribute];
    });

    return map;
  }

  containsSkillIds(skillIds) {
    return skillIds.every(skillId => this.getSkillIds().includes(skillId));
  }

  getSkillIds() {
    return this.getSkills().map(skill => skill.id);
  }

  getSkills() {
    throw Error('getSkills should be implemented in subclass');
  }


}