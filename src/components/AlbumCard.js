import React from 'react';
import PropTypes from 'prop-types';

export default function AlbumCard(props) {
  const { albumCover, AlbumName, artistName } = props;
  return (
    <article className="card">
      <img
        src={ albumCover }
        alt="Album art cover"
        width="300px"
        height="250px"
      />
      <h3>{ AlbumName }</h3>
      <p>{ artistName }</p>
    </article>
  );
}

AlbumCard.propTypes = {
  albumCover: PropTypes.string.isRequired,
  AlbumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};
