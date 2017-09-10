import ContributionModel from './ContributionModel';

export default class ProjectModel {
  constructor({ project }) {
    this.projectData = project;
    this.contributionModels = project.contributions.map(contribution => (
      new ContributionModel({ contribution })
    ));
  }

  matchesSkillFilterCriteria({ skillFilters }) {
    
  }

  containsSkill({ skillId }) {
    let found = false;

    this.contributionModels.forEach(contributionModel => {
      if (contributionModel.containsSkill({ skillId })) {
        found = true;
      }
    });

    return found;
  }

  getContributionModels() {
    return this.contributionModels;
  }
}
