import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import { ProjectListQuery } from './query';
import { addSkillFilter, removeSkillFilter } from 'src/state/projectTreeView/actions';

// import ProjectTreeRoot from 'src/components/ProjectTree';
// import ProjectTrees from './ProjectTrees';

import ProjectTree from 'src/models/ProjectTree';

import {
  getProjectsFromProps,
  getSkillFiltersFromProps,
  // getSkillsFromProjectTree,
  // applyFiltersToProjectTree
} from './selectors';

const History = props => {

  const projects = getProjectsFromProps(props);
  const skillFilters = getSkillFiltersFromProps(props);

  if (projects) {
    const projectModel = ProjectTree(projects);
    console.log(projectModel);
  }
  return null;




  if (projects) {
    const projectTrees = ProjectTrees({
      projectArray: cloneDeep(projects)
    });

    const actions = {};
    actions.addSkillFilter = ({ projectId, skillId }) => (
      props.dispatch(addSkillFilter({ projectId, skillId }))
    );

    actions.removeSkillFilter = ({ projectId, skillId }) => (
      props.dispatch(removeSkillFilter({ projectId, skillId }))
    );

    let projectTreeRoot = {
      id: 0,
      title: "Briet Sparks",
      subtitle: "Professional History",
      childProjects: projectTrees,
    };

    return (
      <ProjectTreeRoot
        id={projectTreeRoot.id}
        title={projectTreeRoot.title}
        subtitle={projectTreeRoot.subtitle}
        childProjects={projectTrees}

        skillFilters={skillFilters}
        addSkillFilter={addSkillFilter}
        removeSkillFilter={removeSkillFilter}
      />
    );
  }

  return null;
};

const HistoryWithData = graphql(ProjectListQuery('0'))(History);

const mapStateToProps = state => {
  return {

  }
};

const HistoryWithDataAndState = connect(state => state)(HistoryWithData);
export default HistoryWithDataAndState;
