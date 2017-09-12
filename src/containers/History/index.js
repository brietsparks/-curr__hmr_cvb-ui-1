import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

// components
import ProjectTreeComponent from 'src/components/ProjectTree';
import ProjectTree from 'src/models/ProjectTree';

// selectors
import { getProjectTreeViewState } from 'src/state/projectTreeView/selectors';
import { getProjectsFromProps, } from './selectors';

// actions
import { addSkillFilter, removeSkillFilter } from 'src/state/projectTreeView/actions';

// graphql query
import { ProjectListQuery } from './query';


const History = props => {

  const actions = {};
  actions.addSkillFilter = ({ projectId, skillId }) => (
    props.dispatch(addSkillFilter({ projectId, skillId }))
  );

  actions.removeSkillFilter = ({ projectId, skillId }) => (
    props.dispatch(removeSkillFilter({ projectId, skillId }))
  );

  const projects = getProjectsFromProps(props);
  const { viewState } = props;
  
  if (projects) {
    const projectModel = ProjectTree(projects, {});
    const { actions } = props;

    return (
      <ProjectTreeComponent
        model={projectModel}
        actions={actions}
        viewState={viewState}
      />
    );
  }

  return <p>No projects</p>;
};

const mapStateToProps = reduxState => {
  const viewState = getProjectTreeViewState(reduxState);

  return { viewState };
};

const HistoryWithState = connect(mapStateToProps)(History);
const HistoryWithStateAndData = graphql(ProjectListQuery("0"))(HistoryWithState);
export default HistoryWithStateAndData;

// const HistoryWithData = graphql(ProjectListQuery("0"))(History);
// const HistoryWithDataAndState = connect(state => state)(HistoryWithData);
// export default HistoryWithDataAndState;
