import React, { Component } from 'react';
import EventsListEntry from './EventsListEntry';

class EventsList extends Component {

  render() {
    const { concerts } = this.props;
    return (
      <div ref={() => 'list'} className="events-list">
        <ul>
          {Object.keys(concerts).map(keyInfo =>
            <EventsListEntry
              key={JSON.stringify(concerts[keyInfo].date)}
              title={concerts[keyInfo].title}
              link={concerts[keyInfo].link}
              date={concerts[keyInfo].date}
              venue={concerts[keyInfo].venue}
              cost={concerts[keyInfo].cost}
              photo={concerts[keyInfo].photo}
              startTime={concerts[keyInfo].startTime}
              youTube={concerts[keyInfo].youTube}
              similarArtists={concerts[keyInfo].similarArtists}
              artistSummary={concerts[keyInfo].artistSummary}
            />,
      )}
        </ul>
      </div>
    );
  }
}

export default EventsList;
