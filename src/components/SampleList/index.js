import React from 'react';

import Sample from 'src/components/Sample';

const SampleList = ({ samples }) => {

  const sampleComponents = samples.map(sample => (
    <li key={sample.id}>
      <Sample {...sample}/>
    </li>
  ));

  return (
    <ul>
      {sampleComponents}
    </ul>
  );
};

export default SampleList;