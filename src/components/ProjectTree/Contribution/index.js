import React from 'react';

import UtilizationList from 'src/components/UtilizationList';
import SampleList from 'src/components/SampleList';

import Filterable from '../FilterableHOC';

const Contribution = ({
  model,
  actions,
}) => {
  const {
    id,
    short_summary,
    long_summary,
    samples,
    utilizations,
  } = model;

  return (
    <div>
      <div>
        <p><strong>Summary:</strong> {short_summary}</p>
        <p>Summary (cont'd): {long_summary}</p>
      </div>

      <div>
        <p>Skill Utilizations</p>
        <UtilizationList utilizations={utilizations}/>
      </div>

      <div>
        <p>Work samples</p>
        <SampleList samples={samples}/>
      </div>
    </div>
  )
};

export default Filterable(Contribution);
