import React, {Component} from 'react';
// import SimilarArtistsEntry from './SimilarArtistsEntry';

class SimilarArtistsList extends Component {
  render() {
    const {artists} = this.props;
    return (
      <div>
        <span>Sounds Like:</span>
          {artists.map(artist => <span key={artist}>{artist}</span>)}
      </div>

    )
  }
}

export default SimilarArtistsList;
