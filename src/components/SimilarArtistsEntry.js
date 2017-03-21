import React, { PropTypes } from 'react';

const SimilarArtistsEntry = ({ artist, index, collection }) => {
  return (
    <span key={index}>
      <span className="sounds-like-artist">{artist}</span>
      {index !== collection.length - 1 && <span className="sounds-like-artist-breaker">·</span>}
    </span>
  );
};

SimilarArtistsEntry.propTypes = {
  artist: PropTypes.string,
  index: PropTypes.number,
  collection: PropTypes.arrayOf(PropTypes.string),
};

export default SimilarArtistsEntry;
