import React from 'react';

const Skill = ({
  id,
  canonical_name,
  aliases,
  urls
}) => {
  return (
    <div>
      <p>{canonical_name}</p>
    </div>
  );
};

export default Skill;