import React from 'react';
import PropTypes from 'prop-types';
export default function MusicCard(props) {
  const { tracks, onFavoriteAddSong } = props;
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
                    name=""
                    id={ track.trackId }
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
};
