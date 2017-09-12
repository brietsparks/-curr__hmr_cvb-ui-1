import React from 'react';

import Contribution from 'src/components/Contribution';

const ContributionList = ({ contributions }) => {

  const contributionComponents = contributions.map(contribution => (
    <li key={contribution.id}>
      <Contribution {...contribution} />
    </li>
  ));

  return (
    <ul>
      {contributionComponents}
    </ul>
  );
};

export default ContributionList;