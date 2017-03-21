import React, { PropTypes } from 'react';
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

TitleList.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string),
};

export default TitleList;
