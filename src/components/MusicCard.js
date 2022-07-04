import React from 'react';
import PropTypes from 'prop-types';

export default function MusicCard(props) {
  const { tracks, onFavoriteAddSong, favoriteSongsId } = props;
  return (
    <div>
      {
        tracks
          .filter((_, index) => index !== 0)
          .map((track) => (
            <article key={ track.trackId }>
              <span>{ track.trackName }</span>
              <audio data-testid="audio-component" src={ track.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
              <span>
                <label htmlFor={ track.trackId }>
                  <input
                    data-testid={ `checkbox-music-${track.trackId}` }
                    type="checkbox"
                    name={ track.trackName }
                    id={ track.trackId }
                    readOnly={ favoriteSongsId.find((id) => id === track.trackId) }
                    checked={ favoriteSongsId.find((id) => id === track.trackId) }
                    onClick={ onFavoriteAddSong.bind(this, track) }
                  />
                  Favorita
                </label>
              </span>
            </article>
          ))
      }
    </div>
  );
}

MusicCard.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFavoriteAddSong: PropTypes.func.isRequired,
  favoriteSongsId: PropTypes.arrayOf(PropTypes.number).isRequired,
};
