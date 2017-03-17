import React, { Component } from 'react';
import EventsListEntry from './EventsListEntry';

class EventsList extends Component {

  render() {
    const { concerts, exploreMusic, eMusicHandler } = this.props;
    return (
      <div ref={() => 'list'} className="events-list">
        <ul>
          {Object.keys(concerts).map((concert, index) =>
            <EventsListEntry
              key={index}
              id={index}
              titles={concerts[concert].title}
              ticketLink={concerts[concert].link}
              date={concerts[concert].date}
              venue={concerts[concert].venue}
              cost={concerts[concert].cost}
              photo={concerts[concert].photo}
              startTime={concerts[concert].startTime}
              youTube={concerts[concert].youTube}
              similarArtists={concerts[concert].similarArtists}
              artistSummary={concerts[concert].artistSummary}
            />,
          )}
        </ul>
      </div>
    );
  }
}

export default EventsList;
