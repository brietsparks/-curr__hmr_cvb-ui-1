import React from 'react';

import ContributionList from 'src/components/ContributionList';
import ProjectTreeList from 'src/components/ProjectTreeList';
import FilterBySkills from 'src/components/FilterBySkills';

import ProjectModel from 'src/containers/History/models/ProjectModel';
import SkillFiltersModel from 'src/containers/History/models/SkillFiltersModel';

const ProjectTree = ({
  id,
  title,
  subtitle,
  contributions = [],
  childProjects = [],

  skillFilters,
  addSkillFilter,
  removeSkillFilter,
}) => {

  const hasContributions = contributions.length > 0;
  const hasChildProjects = childProjects.length > 0;


  const projectModel = new ProjectModel({
    projectData: { id, contributions, childProjects }
  });

  const skillFiltersModel = new SkillFiltersModel({
    skillFiltersData: skillFilters
  });

  console.log(skillFiltersModel.getSkillIdsByProjectId(id))

  const match = matchesFilterCriteria({ id, projectModel, skillFiltersModel });

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <h4>Match: { match ? "1" : "0"}</h4>
      </div>

      <div>
        <div>
          <FilterBySkills
            projectId={id}
            filterableSkills={projectModel.getSkills()}
            addSkillFilter={addSkillFilter}
            removeSkillFilter={removeSkillFilter}
          />
        </div>

        <div>
          { hasContributions &&
          <div>
            <p>Contributions</p>
            <ContributionList contributions={contributions} />
          </div>
          }

          { hasChildProjects &&
          <div>
            <p>Projects</p>
            <ProjectTreeList
              trees={childProjects}
              addSkillFilter={addSkillFilter}
              removeSkillFilter={removeSkillFilter}
            />
          </div>
          }
        </div>
      </div>

    </div>
  )
};

export default ProjectTree;

const matchesFilterCriteria = ({ projectModel, skillFiltersModel }) => {
  const parentModel = projectModel.getParent();

  if (!parentModel) {
    return true;
  }

  const parentId = parentModel.getId();

  const filterSkillIds = skillFiltersModel.getSkillIdsByProjectId(parentId);

  const matches = projectModel.containsSkillsByIds(filterSkillIds);

  return matches;
};

