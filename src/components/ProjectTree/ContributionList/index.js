import React from 'react';

import Contribution from '../Contribution';

const ContributionList = ({ models, actions, filters }) => {

  const contributionComponents = models.map(model => (
    <li key={model.id}>
      <Contribution
        model={model}
        actions={actions}
        filters={filters}
      />
    </li>
  ));

  return (
    <ul>
      {contributionComponents}
    </ul>
  );
};

export default ContributionList;