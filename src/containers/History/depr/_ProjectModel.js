import { cloneDeep } from 'lodash';
import ContributionModel from './ContributionModel';

export default class ProjectModel {
  constructor({ project }) {
    this.projectData = project;

    this.contributionModels = project.contributions.map(contribution => (
      new ContributionModel({ contribution })
    ));
  }

  getFilteredProject({ skillFilters }) {
    const filteredProject = cloneDeep(this.projectData);

    filteredProject.matchesFilter = this.matchesFilterCriteria({ skillFilters });

    const filteredContributions = [];
    this.getContributionModels().forEach(contributionModel => {
      const filteredContribution = contributionModel.getFilteredContribution({ skillFilters });
      filteredContributions.push(filteredContribution);
    });

    filteredProject.contributions = filteredContributions;

    return filteredProject;
  }


  matchesFilterCriteria({ skillFilters }) {
    let matches = false;

    const projectSkillFilters = skillFilters.filter(sf => sf.projectId === this.getId());
    projectSkillFilters.forEach(sf => {
      if (this.containsSkill(sf.skillId)) {
        matches = true;
      }
    });

    return matches;
  }

  getSkills() {
    let skills = [];

    this.contributionModels.forEach(contributionModel => {
      const contributionSkills = contributionModel.getSkills();
      skills = skills.concat(contributionSkills);
    });

    return skills;
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

  getId() {
    return this.projectData.id;
  }

  getContributionModels() {
    return this.contributionModels;
  }
}
