import React, { Component } from 'react';
import EventsListEntry from './EventsListEntry';

// class EventsList extends Component {
//   render() {
//
//     return (
//       <div className="events-list">
//         <ul>
//           <EventsListEntry />
//         </ul>
//
//       </div>
//     )
//   }
// };



const EventsList = (props) => {
  const { concerts } = props;
  return (
    <div className="events-list">
      <ul>
        {Object.keys(concerts).map(key =>
          <EventsListEntry
            title={concerts[key].title}
            link={concerts[key].link}
            date={concerts[key].date}
            venue={concerts[key].venue}
            cost={concerts[key].cost}
            photo={concerts[key].photo}
            startTime={concerts[key].startTime}
          />
        )}
      </ul>
    </div>
  )
}

export default EventsList;
