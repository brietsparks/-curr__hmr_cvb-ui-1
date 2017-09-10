import { cloneDeep } from 'lodash';

export default class ContributionModel {
  constructor({ contribution }) {
    this.contributionData = contribution;
  }

  getFilteredContribution({ skillFilters }) {
    const filteredContribution = cloneDeep(this.contributionData);

    filteredContribution.matchesFilter = this.matchesFilterCriteria({ skillFilters });

    return filteredContribution;
  }

  matchesFilterCriteria({ skillFilters }) {
    let matches = false;

    const parentSkillFilters = skillFilters.filter(sf => sf.projectId === this.getParentId());
    parentSkillFilters.forEach(sf => {
      if (this.containsSkill(sf.skillId)) {
        matches = true;
      }
    });

    return matches;
  }

  getSkills() {
    const skills = [];

    this.contributionData.utilizations.forEach(utilization => {
      skills.push(utilization.skill);
    });

    return skills;
  }

  containsSkill({ skillId }) {
    const utilization = this.contributionData.utilizations.find(
      utilization => utilization.skill.id === skillId
    );

    return !!utilization;
  }

  getParentId() {
    return this.contributionData.parent_id;
  }
}