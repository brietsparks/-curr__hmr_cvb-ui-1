import ProjectTreeNode from './AbstractProjectTreeNode';

export default class Contribution extends ProjectTreeNode {

  getSkills() {
    return this.utilizations
      ? this.utilizations.map(utilization => utilization.skill)
      : [];
  }

}