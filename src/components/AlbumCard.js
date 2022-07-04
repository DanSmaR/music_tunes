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
      <h3 data-testid="album-name">{ AlbumName }</h3>
      <p data-testid="artist-name">{ artistName }</p>
    </article>
  );
}

AlbumCard.propTypes = {
  albumCover: PropTypes.string,
  AlbumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};

AlbumCard.defaultProps = {
  albumCover: '',
};
