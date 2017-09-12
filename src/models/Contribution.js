import ProjectTreeNode from './AbstractProjectTreeNode';

export default class Contribution extends ProjectTreeNode {

  getSkills() {
    return this.data.utilizations
      ? this.data.utilizations.map(utilization => utilization.skill)
      : [];
  }

}