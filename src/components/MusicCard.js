import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const { tracks } = this.props;
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
                  <label htmlFor="favorite-song">
                    <input
                      data-testid={ `checkbox-music-${track.trackId}` }
                      type="checkbox"
                      name=""
                      id="favorite-song"
                      onChange={(ev)=>{console.log(ev.target);}}
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
}

MusicCard.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
