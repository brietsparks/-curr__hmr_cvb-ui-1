import React from 'react';
import { Popup } from 'semantic-ui-react'

const Skill = ({
  id,
  canonical_name,
  aliases = [],
  urls = []
}) => {
  const popupContent = (
    <div>
      <p>{canonical_name}</p>


      { urls &&
        <div>
          <p>Synonyms:</p>
          <ul>
            { aliases.map(alias => <li key={id + alias}>{alias}</li>) }
          </ul>
        </div>
      }


      { urls &&
        <div>
          <p>More info:</p>
          <ul>
            { urls.map(url => <li key={id + url}><a href={url}>{url}</a></li>) }
          </ul>
        </div>
      }

    </div>
  );

  return (
    <div>
      <Popup
        trigger={<p>{canonical_name}</p>}
        content={popupContent}
        on='click'
        hideOnScroll
      />
    </div>
  );
};

export default Skill;