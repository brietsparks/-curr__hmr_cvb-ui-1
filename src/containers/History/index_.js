import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { cloneDeep } from 'lodash';

import { ProjectListQuery } from './query';
import {
  addSkillFilter as addSkillFilterAction,
  removeSkillFilter as removeSkillFilterAction
} from 'src/substates/projectTreeView/actions';

import ProjectTreeRoot from 'src/components/ProjectTree';
import ProjectTrees from './ProjectTrees';
import {
  getProjectsFromProps,
  getAppliedSkillFilters,
  getSkillsFromProjectTree,
  applyFiltersToProjectTree
} from './selectors';


const History = props => {

  const projects = getProjectsFromProps(props);
  const skillFilters = getAppliedSkillFilters(props);

  if (projects) {
    const projectTrees = ProjectTrees({
      projectArray: cloneDeep(projects)
    });

    const addSkillFilter = ({ projectId, skillId }) => (
      props.dispatch(addSkillFilterAction({ projectId, skillId }))
    );

    const removeSkillFilter = ({ projectId, skillId }) => (
      props.dispatch(removeSkillFilterAction({ projectId, skillId }))
    );

    let projectTreeRoot = {
      id: 0,
      title: "Briet Sparks",
      subtitle: "Professional History",
      childProjects: projectTrees,
    };

    projectTreeRoot = applyFiltersToProjectTree({
      projectTree: projectTreeRoot,
      skillFilters
    });

    const filterableSkills = getSkillsFromProjectTree({ projectTree: projectTreeRoot });

    return (
      <ProjectTreeRoot
        id={projectTreeRoot.id}
        title={projectTreeRoot.title}
        subtitle={projectTreeRoot.subtitle}
        childProjects={projectTrees}

        matchesFilter={true}

        addSkillFilter={addSkillFilter}
        removeSkillFilter={removeSkillFilter}
      />
    );
  }

  return null;
};
const HistoryWithData = graphql(ProjectListQuery("0"))(History);
const HistoryWithDataAndState = connect(state => state)(HistoryWithData);
export default HistoryWithDataAndState;
