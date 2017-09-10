import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { ProjectListQuery } from './query';

import {
  addSkillFilter as addSkillFilterAction,
  removeSkillFilter as removeSkillFilterAction
} from 'src/substates/projectTreeView/actions';

import HistoryRootComponent from 'src/components/ProjectTree';
import ProjectTrees from './ProjectTrees';
import { getProjectsFromProps, getSkillsFromProject, getAppliedSkillFilters } from './selectors';


const History = props => {

  const projects = getProjectsFromProps(props);

  if (projects) {
    projects.forEach(p => console.log(getSkillsFromProject({project: p})));

    const projectTrees = ProjectTrees({ projectArray: projects });

    // const filterableSkills = getFilterableSkills({ projectTrees });
    // console.log(getAppliedSkillFilters(props))

    const addSkillFilter = ({ projectId, skillId }) => (
      props.dispatch(addSkillFilterAction({ projectId, skillId }))
    );

    const removeSkillFilter = ({ projectId, skillId }) => (
      props.dispatch(removeSkillFilterAction({ projectId, skillId }))
    );

    return (
      <HistoryRootComponent
        id={0}
        title={"Briet Sparks"}
        subtitle={"Professional History"}
        childProjects={projectTrees}
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
