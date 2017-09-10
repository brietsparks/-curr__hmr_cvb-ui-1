import expect from 'expect';
import { applyFiltersToProjectTree } from '../../selectors';

const projectTree =
{
  id: 1,
  contributions: [
    {
      id: 10,
      utilizations: [
        { skill_id: 1100 },
        { skill_id: 1101 },
      ]
    },
    {
      id: 11,
      utilizations: [
        { skill_id: 1110 }
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
                { skill_id: 3300 }
              ]
            }
          ]
        }
      ]
    }
  ]
};

describe('applyFiltersToProjectTree', () => {
  it('', () => {
    const skillFilters = [
      { projectId: 1, skill_id: 1000}
    ];

    console.log(1)
    // const filteredProjectTree = applyFiltersToProjectTree({ projectTree, skillFilters });
    // console.log(filteredProjectTree);
  })
});
