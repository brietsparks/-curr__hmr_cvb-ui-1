import expect from 'expect';
import {
  getSkillsFromProjectTree,
  getSkillsFromContribution,
  arrayIncludesAll,
  applyFiltersToProjectTree
} from '../selectors';

const projectTree =
{
  id: 1,
  contributions: [
    {
      id: 10,
      utilizations: [
        { skill: { id: 1100 }},
        { skill: { id: 1101 }},
      ]
    },
    {
      id: 11,
      utilizations: [
        { skill: { id: 1110 }}
      ]
    }
  ],
  childProjects: [
    {
      id: 2,
      contributions: [],
      childProjects: [
        {
          id: 3,
          contributions: [
            {
              id: 30,
              utilizations: [
                { skill: { id: 3300 } },
                { skill: { id: 3301 } }
              ]
            }
          ],
          childProjects: []
        }
      ]
    }
  ]
};

const getNestedProject = (projectTree) => {
  return projectTree.childProjects.find(childProject => childProject.id === 2)
    .childProjects.find(childProject => childProject.id === 3);
};

describe('getSkillsFromContribution', () => {
  it('returns skills of a contribution', () => {
    const contribution = {
      utilizations: [
        { skill: {id: 1} },
        { skill: {id: 2} },
      ]
    };

    const skills = getSkillsFromContribution({ contribution });

    const skillIds = skills.map(s => s.id);

    expect(skillIds.sort()).toEqual([1,2]);
  });
});

describe('getSkillsFromProjectTree', () => {
  it('returns skills of all contributions and contributions of descendant projects', () => {
    const skills = getSkillsFromProjectTree({ projectTree });

    const expectedSkillIds = [ 1100, 1101, 1110, 3300, 3301];
    const skillIds = skills.map(skill => skill.id);

    expect(expectedSkillIds.sort()).toEqual(skillIds.sort());
  });
});

describe('arrayIncludesAll', () => {
  it('returns true when an array includes all required items', () => {
    const array = [1,2,3,4,5];
    const requiredItems = [4,3,2,1];

    expect(arrayIncludesAll({ array, requiredItems })).toEqual(true);
  });

  it('returns false when an array does not include all required items', () => {
    const array = [1,2,3,4,5];
    const requiredItems = [4,3,2,1,0];

    expect(arrayIncludesAll({ array, requiredItems })).toEqual(false);
  });
});


describe('applyFiltersToProjectTree:', () => {
  describe('with project node,', () => {
    describe('setting "matchesFilter" to true when a contribution matches all filter criteria', () => {
      it('works on top level project node', () => {
        const skillFilters = [
          { projectId: 1, skillId: 1100},
          { projectId: 1, skillId: 1101}
        ];

        const filteredProjectTree = applyFiltersToProjectTree({ projectTree, skillFilters });

        expect(filteredProjectTree.matchesFilter).toEqual(true);
      });

      it('works on nested project node', () => {
        const skillFilters = [
          { projectId: 3, skillId: 3300},
          { projectId: 3, skillId: 3301}
        ];
        const filteredProjectTree = applyFiltersToProjectTree({ projectTree, skillFilters });
        const nestedProject = getNestedProject(filteredProjectTree);
        expect(nestedProject.matchesFilter).toEqual(true);
      });

    });

    describe('setting "matchesFilter" to false when no contributions match all filter criteria', () => {
      it('works on top level project node', () => {
        const skillFilters = [
          { projectId: 1, skillId: 1100},
          { projectId: 1, skillId: 1101},
          { projectId: 1, skillId: 0}
        ];

        const filteredProjectTree = applyFiltersToProjectTree({ projectTree, skillFilters });

        expect(filteredProjectTree.matchesFilter).toEqual(false);
      });

      it('works on nested project node', () => {
        const skillFilters = [
          { projectId: 3, skillId: 3300},
          { projectId: 3, skillId: 3301},
          { projectId: 3, skillId: 0}
        ];

        const filteredProjectTree = applyFiltersToProjectTree({ projectTree, skillFilters });
        const nestedProject = getNestedProject(filteredProjectTree);
        expect(nestedProject.matchesFilter).toEqual(false);
      });

    });

    describe('with contribution,', () => {
      describe('setting "matchesFilter" to true when it matches all filter criteria', () => {
        it('works on top level project node', () => {
          const skillFilters = [
            { projectId: 1, skillId: 1100},
            { projectId: 1, skillId: 1101}
          ];

          const filteredProjectTree = applyFiltersToProjectTree({ projectTree, skillFilters });

          const filteredContribution = filteredProjectTree.contributions.find(contribution => contribution.id === 10);

          expect(filteredContribution.matchesFilter).toEqual(true);
        });

        it('works on nested project node', () => {
          const skillFilters = [
            { projectId: 3, skillId: 3300},
            { projectId: 3, skillId: 3301}
          ];

          const filteredProjectTree = applyFiltersToProjectTree({ projectTree, skillFilters });

          const nestedProject = getNestedProject(filteredProjectTree);
          const filteredContribution = nestedProject.contributions.find(contribution => contribution.id === 30);
          expect(filteredContribution.matchesFilter).toEqual(true);
        });
      });

      describe('setting "matchesFilter" to false when it does not match all filter criteria', () => {
        it('works on top level project node', () => {
          const skillFilters = [
            { projectId: 1, skillId: 1100},
            { projectId: 1, skillId: 1101},
            { projectId: 1, skillId: 0}
          ];

          const filteredProjectTree = applyFiltersToProjectTree({ projectTree, skillFilters });

          const filteredContribution = filteredProjectTree.contributions.find(contribution => contribution.id === 10);

          expect(filteredContribution.matchesFilter).toEqual(false);
        });

        it('works on nested project node', () => {
          const skillFilters = [
            { projectId: 3, skillId: 3300},
            { projectId: 3, skillId: 3301},
            { projectId: 3, skillId: 0}
          ];

          const filteredProjectTree = applyFiltersToProjectTree({ projectTree, skillFilters });

          const nestedProject = getNestedProject(filteredProjectTree);
          const filteredContribution = nestedProject.contributions.find(contribution => contribution.id === 30);
          expect(filteredContribution.matchesFilter).toEqual(false);
        });
      });
    });
  });
});
