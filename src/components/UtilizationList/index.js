import React from 'react';

import Utilization from 'src/components/Utilization';

const UtilizationList = ({ utilizations }) => {

  const utilizationComponents = utilizations.map(utilization => (
    <li key={utilization.id}>
      <Utilization {...utilization}/>
    </li>
  ));

  return (
    <ul>
      {utilizationComponents}
    </ul>
  );
};

export default UtilizationList;