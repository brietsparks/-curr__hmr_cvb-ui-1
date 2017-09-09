import React from 'react';

const Contribution = ({
  id, short_summary, long_summary, samples, utilizations
}) => {
  return (
    <div>
      <div>
        <p>{short_summary}</p>
        <p>{long_summary}</p>
      </div>

      <div>
      </div>
    </div>
  )
};

export default Contribution;
