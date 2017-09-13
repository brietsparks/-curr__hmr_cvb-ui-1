import ProjectTreeNode from './AbstractProjectTreeNode';

export default class Contribution extends ProjectTreeNode {

  getSkills() {
    const skills = this.utilizations
      ? this.utilizations.map(utilization => utilization.skill)
      : [];

    this.sortSkills(skills);

    return skills;
  }

}