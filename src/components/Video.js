import React, {Component} from 'react';

class Video extends Component {
  constructor() {
    super()
    this.renderHelper = this.renderHelper.bind(this)
    this.state = {
      shouldDisplayIframe: false
    }
  }

  renderHelper() {
    if(!this.state.shouldDisplayIframe) {
      return (
        <img src={this.props.thumbnail} onClick={()=>this.setState({shouldDisplayIframe: true})} alt='thumbnail'/>
      )
    } else {
      return(
        <iframe className="video" width="100%" height="auto" src={`http://www.youtube.com/embed/${this.props.video}?autoplay=1`} frameBorder="0" ></iframe>
      )
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
