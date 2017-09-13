import React from 'react';
import { Card, Divider, Accordion, Icon } from 'semantic-ui-react'

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

  const hasUtilizations = utilizations.length > 0;
  const hasSamples = samples.length > 0;

  const hasReferenceData = hasUtilizations || hasSamples;

  const hasLongSummary = !!long_summary;

  return (
    <Card style={{
      marginLeft: '.55em',
      marginBottom: '.96em',
      padding: 10
    }}>
      <div>
        <p><strong>{short_summary}</strong></p>
      </div>

      { hasUtilizations &&
        <div>
          <p>Skill Utilizations</p>
          <UtilizationList utilizations={utilizations}/>
        </div>
      }

      { hasSamples &&
        <div>
          <p>Work samples</p>
          <SampleList samples={samples}/>
        </div>
      }

      { hasReferenceData && hasLongSummary &&
        <Divider/>
      }

      { hasLongSummary &&
        <Accordion>
          <Accordion.Title>
            <Icon name='dropdown' />
            More details
          </Accordion.Title>

          <Accordion.Content>
            <p>{long_summary}</p>
          </Accordion.Content>
        </Accordion>
      }

    </Card>
  )
};

export default Filterable(Contribution);
