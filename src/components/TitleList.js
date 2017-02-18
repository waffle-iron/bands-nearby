import React, {Component} from 'react';

class TitleList extends Component {
  handleSmallScreen = () => {
    if (!window.matchMedia("(min-width: 667px)").matches) {
      return false;

    }
    return true;
  }
  render(){
    const isLargeScreen = this.handleSmallScreen();
    const {titles} = this.props;


    return (
      <div>
        {isLargeScreen && <div>

          {
            titles.reduce((acc, title, index) => {
              if (index !== 0) {
                console.log(acc)
                acc.push(<span key={index} className="supporting-bands-title">{title}</span>);
              }
              return acc;
            }, [])

          }
        </div>}
        {!isLargeScreen && <div>
          <span key={'supportingBand'} className="supporting-bands-title">{titles[1]}</span>

        </div>}
      </div>
    )
  }

}

export default TitleList;
