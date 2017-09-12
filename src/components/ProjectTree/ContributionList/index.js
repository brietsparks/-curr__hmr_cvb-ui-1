import React from 'react';

import Contribution from '../Contribution';

const ContributionList = ({ models, actions, viewState }) => {

  const contributionComponents = models.map(model => (
    <li key={model.id}>
      <Contribution
        model={model}
        actions={actions}
        viewState={viewState}
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