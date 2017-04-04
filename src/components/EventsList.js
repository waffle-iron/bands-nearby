import React, { Component, PropTypes } from 'react';
import EventsListEntry from './EventsListEntry';
import { connect } from 'react-redux'

class EventsList extends Component {

  static propTypes = {
    concerts: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    const concerts = this.props.concertData
    return (
      <div ref={() => 'list'} className="events-list">
        <ul>
          {this.props.concertData && Object.keys(concerts).map((concert, index) =>
            <EventsListEntry
              key={concerts[concert].id}
              id={concerts[concert].id}
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

// map states to props do filter here

const mapStateToProps = (state) => {
  return {
    concertData: state.concertData
  }
};

export default connect(mapStateToProps)(EventsList);
