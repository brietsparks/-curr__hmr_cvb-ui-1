import React from 'react';
import { Card } from 'semantic-ui-react'

import Contribution from '../Contribution';

const ContributionList = ({ models, actions, filters }) => {

  const contributionComponents = models.map(model => (
    <Contribution
      key={model.id}
      model={model}
      actions={actions}
      filters={filters}
    />
  ));

  return (
    <Card.Group>
      {contributionComponents}
    </Card.Group>
  );
};

export default ContributionList;