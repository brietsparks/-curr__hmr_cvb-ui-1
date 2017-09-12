import expect from 'expect';

import ProjectModel from '../ProjectModel';

const projectTree = {
  id: 1,
  contributions: [
    {
      utilizations: [
        { skill: { id: 1000 } },
        { skill: { id: 1001 } }
      ]
    }
  ],

  childProjects: [
    {
      id: 2,
      contributions: [
        {
          utilizations: [
            { skill: { id: 1002 } },
            { skill: { id: 1003 } }
          ]
        }
      ],

      childProjects: [
        {
          id: 3,
          contributions: [
            {
              utilizations: [
                { skill: { id: 1004 } },
                { skill: { id: 1005 } }
              ]
            }
          ],
        }
      ]
    }
  ]
};

const model = new ProjectModel({ projectData: projectTree });

describe('ProjectModel', () => {

  describe('.getDescendantProjectById', () => {
    it('returns a childProject by its id', () => {
      const project = model.getDescendantProjectById(2);
      expect(project.getId()).toEqual(2);
    });

    it('returns a descendant by its id', () => {
      const project = model.getDescendantProjectById(3);
      expect(project.getId()).toEqual(3);
    });
  });

  describe('.getSkills', () => {
    describe('returning skills of all ancestor contributions', () => {
      it('works at root level', () => {
        const expected = [
          { id: 1000 }, { id: 1001 }, { id: 1002 }, { id: 1003 }, { id: 1004 }, { id: 1005 },
        ];

        const actual = model.getSkills();

        expect(actual.sort()).toEqual(expected.sort());
      });

      it('works at nest level 1', () => {
        const expected = [
          { id: 1002 }, { id: 1003 }, { id: 1004 }, { id: 1005 },
        ];

        const actual = model.getDescendantProjectById(2).getSkills();

        expect(actual.sort()).toEqual(expected.sort());
      });

      it('works at nest level 2', () => {
        const expected = [
          { id: 1004 }, { id: 1005 },
        ];

        const actual = model.getDescendantProjectById(3).getSkills();

        expect(actual.sort()).toEqual(expected.sort());
      });
    });
  });

  describe('.getSkillIds', () => {
    describe('returning skill ids of all ancestor contributions', () => {
      it('works at root level', () => {
        const expected = [1000, 1001, 1002, 1003, 1004, 1005];
        const actual = model.getSkillIds();
        expect(actual.sort()).toEqual(expected.sort());
      });
      it('works at nest level 1', () => {
        const expected = [1002, 1003, 1004, 1005];
        const actual = model.getDescendantProjectById(2).getSkillIds();
        expect(actual.sort()).toEqual(expected.sort());
      });
      it('works at nest level 2', () => {
        const expected = [1004, 1005];
        const actual = model.getDescendantProjectById(3).getSkillIds();
        expect(actual.sort()).toEqual(expected.sort());
      });
    });
  });
});