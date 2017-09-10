import React from 'react';

import Skill from 'src/components/Skill';

const Utilization  = ({
  id, contribution_id, skill
}) => {
  return (
    <div>
      <Skill {...skill} />
    </div>
  );
};

export default Utilization;