import React from 'react';
import SimilarArtistsEntry from './SimilarArtistsEntry';

const SimilarArtistsList = ({ artists }) => {
  return (
    <div className="sounds-like-container">
      <span className="sounds-like">Sounds Like:</span>
      <div className="sounds-like-artist-container">
        {artists.map((artist, index, collection) => {
          return (
            <SimilarArtistsEntry
              key={index}
              artist={artist}
              index={index}
              collection={collection}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SimilarArtistsList;
