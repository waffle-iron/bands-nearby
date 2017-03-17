import React from 'react';
import { isSmallScreen } from '../utilities/utils';

const TitleList = ({ titles }) => {
  return (
    <div>
      {!isSmallScreen() && <div>
        {titles.reduce((acc, title, index) => {
          if (index !== 0) {
            acc.push(<span key={index} className="supporting-bands-title">{title}</span>);
          }
          return acc;
        }, [])}
      </div>}
      {isSmallScreen() && <div>
        <span key={'supportingBand'} className="supporting-bands-title">{titles[1]}</span>
      </div>}
    </div>
  );
};

export default TitleList;
