
export default class ContributionModel {
  constructor({ contribution }) {
    this.contributionData = contribution;
  }

  containsSkill({ skillId }) {
    const utilization = this.contributionData.utilizations.find(
      utilization => utilization.skill.id === skillId
    );

    return !!utilization;
  }
}