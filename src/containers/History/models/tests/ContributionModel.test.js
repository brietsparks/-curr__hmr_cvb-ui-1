import expect from 'expect';

import ContributionModel from '../ContributionModel';

const parent = {};

const contribution = {
  utilizations: [
    { skill: { id: 1000 } },
    { skill: { id: 1001 } }
  ]
};

const model = new ContributionModel({
  contributionData: contribution,
  parentModel: parent
});

describe('ContributionModel', () => {
  describe('.getSkills', () => {
    it('returns skills attached to the contribution', () => {
      const expected = [
        { id: 1000 },
        { id: 1001 }
      ];

      const actual = model.getSkills();

      expect(actual).toEqual(expected);
    });
  });

  describe('.getSkillIds', () => {
    it('returns the skill ids of the skills attached to the contribution', () => {
      const expected = [1000,1001];
      const actual = model.getSkillIds();
      expect(actual).toEqual(expected);
    });
  });

  describe('.containsSkillsByIds', () => {
    it('returns true if contribution has all the given skill ids', () => {
      let skillIds;

      skillIds = [1000, 1001];
      expect(model.containsSkillsByIds(skillIds)).toEqual(true);

      skillIds = [1000];
      expect(model.containsSkillsByIds(skillIds)).toEqual(true);
    });

    it('returns false if contribution does not have all the given skill ids', () => {
      let skillIds;

      skillIds = [1000, 1001, 0];
      expect(model.containsSkillsByIds(skillIds)).toEqual(false);

      skillIds = [0];
      expect(model.containsSkillsByIds(skillIds)).toEqual(false);
    })
  })
});