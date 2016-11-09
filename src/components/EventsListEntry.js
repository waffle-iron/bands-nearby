import React, { Component } from 'react';

class EventsListEntry extends Component {
  render() {
    const { title, link, date, venue, cost, photo, startTime } = this.props;
    return (
      <li className="event-list-entry">
        {/* <span className="date">{date}</span> */}
        <a href={link}>
          <span className="title">{title}</span>
          <span className="startTime">{startTime}pm</span>
          <span className="venue">{venue}</span>
          <span className="cost">{cost}</span>
        </a>
        <div className="concert-photo-wrapper">
          <img className="concert-photo" src={photo} alt="concert photo" />
        </div>
      </li>
        )
        }
        }

export default EventsListEntry
