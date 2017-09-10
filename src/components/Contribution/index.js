import React from 'react';

import UtilizationList from 'src/components/UtilizationList';
import SampleList from 'src/components/SampleList';

const Contribution = ({
  id, short_summary, long_summary, samples, utilizations
}) => {
  return (
    <div>
      <div>
        <p>Summary: {short_summary}</p>
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

export default Contribution;
