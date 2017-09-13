import React from 'react';
import Chip from 'material-ui/Chip';

import Skill from 'src/components/Skill';

const Utilization  = ({
  id, contribution_id, skill
}) => {
  return (
    <Chip>
      <Skill {...skill} />
    </Chip>
  );
};

export default Utilization;