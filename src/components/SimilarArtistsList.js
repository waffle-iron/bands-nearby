import React, {Component} from 'react';
// import SimilarArtistsEntry from './SimilarArtistsEntry';

class SimilarArtistsList extends Component {
  render() {
    const {artists} = this.props;
    return (
      <div className="sounds-like-container">
        <span className="sounds-like">Sounds Like:</span>
          <div className="sounds-like-artist-container">
            {artists.map((artist, index, collection) => {
              return <span><span key={artist} className="sounds-like-artist">{artist}</span>
              {index !== collection.length -1 && <span className="sounds-like-artist-breaker">·</span>}
            </span>
          })}
          </div>
      </div>
    )
  }
}

export default SimilarArtistsList;
