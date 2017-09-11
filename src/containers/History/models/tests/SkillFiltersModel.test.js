import expect from 'expect';

import SkillFiltersModel from '../SkillFiltersModel';

const filters = [
  { projectId: 1, skillId: 1000 },
  { projectId: 1, skillId: 1001 },
  { projectId: 2, skillId: 1000 }
];

const model = new SkillFiltersModel({ skillFiltersData: filters });

describe('SkillFiltersModel', () => {
  describe('.getFiltersByProjectId', () => {
    it('returns filter objects that have the given project id', () => {
      const expected = [
        { projectId: 1, skillId: 1000 },
        { projectId: 1, skillId: 1001 },
      ];

      const actual = model.getFiltersByProjectId(1);

      expect(actual.sort()).toEqual(expected.sort());
    })
  });

  describe('.getSkillIdsByProjectId', () => {
    it('returns the skill ids of the filters applied to a project by its id', () => {
      const expected = [1000, 1001];

      const actual = model.getSkillIdsByProjectId(1);

      expect(actual.sort()).toEqual(expected.sort());
    })
  })
});