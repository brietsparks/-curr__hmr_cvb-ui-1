import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

// components
import ProjectTreeComponent from 'src/components/ProjectTree';
import ProjectTree from 'src/models/ProjectTree';

// selectors
import { getProjectsFromProps, getSkillFiltersFromState } from './selectors';

// actions
import { addSkillFilter, removeSkillFilter } from 'src/state/projectTreeView/actions';

// models
import SkillFiltersModel from 'src/models/SkillFilters';

// graphql query
import { projectListQuery } from './query';


const ProjectTreeContainer = props => {

  const { dispatch, filters, userId } = props;
  const projects = getProjectsFromProps(props);

  const actions = {};
  actions.addSkillFilter = ({ projectId, skillId }) => (
    dispatch(addSkillFilter({ projectId, skillId }))
  );

  actions.removeSkillFilter = ({ projectId, skillId }) => (
    dispatch(removeSkillFilter({ projectId, skillId }))
  );


  if (projects) {
    const projectModel = ProjectTree(projects, { id: "0" });
    
    return (
      <ProjectTreeComponent
        model={projectModel}
        actions={actions}
        filters={filters}
      />
    );
  }

  return <p>No projects</p>;
};

const mapStateToProps = reduxState => {
  const skillFiltersData = getSkillFiltersFromState(reduxState);

  return {
    filters: {
      skill: new SkillFiltersModel({ data: skillFiltersData })
    }
  };
};

const ProjectTreeContainerWithState =
  connect(mapStateToProps)(ProjectTreeContainer);

const ProjectTreeContainerWithStateAndData =
  graphql(projectListQuery, {
    options: ownProps => ({
      variables: { user_id: ownProps.userId }
    })
  })(ProjectTreeContainerWithState);

export default ProjectTreeContainerWithStateAndData;
