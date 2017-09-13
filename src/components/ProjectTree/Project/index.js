import React from 'react';

import { Sidebar, Button, Segment, Menu } from 'semantic-ui-react'


// Components
import ContributionList from '../ContributionList';
import ProjectTreeList from '../ProjectList';
import SkillFilter from './SkillFilter';

// HOC
import Filterable from '../FilterableHOC';

export class Project extends React.Component {

  constructor() {
    super();
    this.state = {
      showSidebar: false
    }
  }

  render() {

    const { showSidebar } = this.state;

    const { actions, filters, model } = this.props;

    const {
      id, title, subtitle,
      contributionModels = [],
      childProjectModels = [],
    } = model;

    const hasContributions = contributionModels.length > 0;
    const hasChildProjects = childProjectModels.length > 0;

    return (
      <div>
        <div>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
        </div>

        <Button onClick={ () => { this.setState({ showSidebar: !showSidebar }) } }/>

        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible={showSidebar} icon='labeled' vertical inverted>
            <Menu.Item name="skill_filter">
              <SkillFilter
                projectId={id}
                projectModel={model}
                skillFilters={filters.skill}
                addSkillFilter={actions.addSkillFilter}
                removeSkillFilter={actions.removeSkillFilter}
              />
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            { hasContributions &&
            <div>
              <p>Contributions</p>
              <ContributionList
                models={contributionModels}
                actions={actions}
                filters={filters}
              />
            </div>
            }

            { hasChildProjects &&
            <div>
              <p>Projects</p>
              <ProjectTreeList
                models={childProjectModels}
                actions={actions}
                filters={filters}
              />
            </div>
            }
          </Sidebar.Pusher>
        </Sidebar.Pushable>

      </div>
    );
  }
}

export default Filterable(Project);