import React, {Component} from 'react';

class TitleList extends Component {
  render(){
    const {titles} = this.props;
    return (
      <div>
        {
          titles.reduce((acc, title, index) => {
            if (index !== 0) {
              acc.push(<span key={index} className="supporting-bands-title">{title}</span>);
            }
            return acc;
        }, [])
      }
      </div>
    )
  }

}

export default TitleList;
