import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { ProjectListQuery } from './query';

import ProjectTrees from 'src/components/ProjectTrees';

const History = () => {
  return (
    <ProjectTrees/>
  );
};

const HistoryWithData = graphql(ProjectListQuery("0"))(History);
const HistoryWithDataAndState = connect(state => state)(HistoryWithData);

export default HistoryWithDataAndState;