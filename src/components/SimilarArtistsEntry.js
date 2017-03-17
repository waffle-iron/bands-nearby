import React from 'react';

const SimilarArtistsEntry = ({ artist, index, collection }) => {
  return (
    <span key={index}>
      <span className="sounds-like-artist">{artist}</span>
      {index !== collection.length - 1 && <span className="sounds-like-artist-breaker">·</span>}
    </span>
  );
};

export default SimilarArtistsEntry;
