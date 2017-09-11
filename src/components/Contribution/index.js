import React from 'react';

import UtilizationList from 'src/components/UtilizationList';
import SampleList from 'src/components/SampleList';

const Contribution = ({
  id,
  short_summary,
  long_summary,
  samples,
  utilizations,
  matchesFilter
}) => {
  return (
    <div>
      <div>
        <h4>MatchesFilter {matchesFilter ? "1" : "0"}</h4>
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

export default Contribution;
