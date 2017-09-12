export default class ContributionModel {
  constructor({ contributionData, parentModel }) {
    if(!contributionData) {
      throw new Error('ContributionModel requires contributionData object literal')
    }

    if(!parentModel) {
      throw new Error('ContributionModel requires parentModel')
    }

    // _contributionData for internal use
    const _contributionData = contributionData;
    this._contributionData = _contributionData;

    this.skills = _contributionData.utilizations
      ? _contributionData.utilizations.map(utilization => utilization.skill)
      : [];
  }

  getSkills() {
    return this.skills;
  }

  getSkillIds() {
    return this.getSkills().map(skill => skill.id);
  }

  containsSkillsByIds(skillIds) {
    return skillIds.every(skillId => this.getSkillIds().includes(skillId));
  }

}
