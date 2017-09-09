import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { ProjectListQuery } from './query';

import ProjectTrees from 'src/components/ProjectTrees';
import { getProjectsFromProps, createProjectTrees } from './selectors';

const History = props => {

  const projects = getProjectsFromProps(props);

  if (projects) {
    const projectTrees = createProjectTrees({ projectArray: projects });

    return (
      <ProjectTrees trees={projectTrees} />
    );
  }

  return null;
};

const HistoryWithData = graphql(ProjectListQuery("0"))(History);
const HistoryWithDataAndState = connect(state => state)(HistoryWithData);

export default HistoryWithDataAndState;