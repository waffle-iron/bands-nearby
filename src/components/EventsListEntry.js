import React, { Component } from 'react';
import Video from './Video';

class EventsListEntry extends Component {
  constructor() {
    super()
    this.state = {
      toggled: false,
    }
  }

  toggle() {
    this.setState({toggled: !this.state.toggled})
  }

  addClass(){
    if (this.state.toggled) {
      return "show "
    } else {
      return "hide"
    }
  }

  render() {
    const { title, link, date, venue, cost, photo, startTime, youTube, similarArtists } = this.props;
    let isDisplayed = this.addClass()

    let soundsLike;
    similarArtists[0] ? soundsLike = `Sounds like: ${similarArtists}` : null

    return (
      <li className="event-list-entry"  onClick={()=> this.toggle()}>
        <div className="show-info">
          <div className="date">{date}</div>
          <span className="title">{title}</span>
          <div>
            <a href={link}>
              <span className="venue">{venue}</span>
            </a>
          </div>
          <span className="startTime">{startTime}pm</span>
          <span className="cost">${cost}</span>
          <div className="similarArtists">
          {soundsLike}
          </div>
        </div>
        <div className="concert-photo-wrapper">
          <img className="concert-photo" src={photo} alt="concert photo" />
        </div>
        <div className="video-container" className={isDisplayed}>
          {youTube.map(video => <Video video={`http://www.youtube.com/embed/${video}`} key={video}/>)}
        </div>
      </li>
    )}
  }

export default EventsListEntry