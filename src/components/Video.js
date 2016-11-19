import React, {Component} from 'react';

class Video extends Component {
  constructor() {
    super()
    this.renderHelper = this.renderHelper.bind(this)
    this.state = {
      shouldDisplayIframe: false
    }
  }

  autoplayFirst() {
    return (
      <iframe className="video" className={this.props.isDisplayed} width="100%" height="auto" src={`http://www.youtube.com/embed/${this.props.video}?autoplay=1`} frameBorder="0" ></iframe>
    )
  }

  renderHelper() {
    if(!this.props.isDisplayed) {
      return (
        <img src={this.props.thumbnail} onClick={()=>this.setState({shouldDisplayIframe: true})} alt='thumbnail'/>
      )
    } else {
      if (!this.props.index) {
        return this.autoplayFirst()
      } else {
        return(
          <iframe className="video" className={this.props.isDisplayed} width="100%" height="auto" src={`http://www.youtube.com/embed/${this.props.video}`} frameBorder="0" ></iframe>
        )
      }
    }
  }

  render() {
    return(
      <div>
        {this.renderHelper()}
      </div>
    )
  }
}

export default Video;
