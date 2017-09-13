import React from 'react';

import Utilization from 'src/components/Utilization';

const UtilizationList = ({ utilizations }) => {

  const utilizationComponents = utilizations.map(utilization => (
    <li style={{ display: 'inline-block', marginRight: 6 }} key={utilization.id}>
      <Utilization {...utilization}/>
    </li>
  ));

  return (
    <ul style={{ padding: 0 }}>
      {utilizationComponents}
    </ul>
  );
};

export default UtilizationList;