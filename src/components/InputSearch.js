import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputSearch extends Component {
  render() {
    const { onInputChange, onSubmit, artistName } = this.props;
    const MIN_NAME_LENGTH = 2;
    return (
      <form onSubmit={ onSubmit }>
        <p>
          <input
            data-testid="search-artist-input"
            type="text"
            id="music-name"
            name="artistName"
            value={ artistName }
            onChange={ onInputChange }
          />
        </p>
        <p>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ artistName.length < MIN_NAME_LENGTH }
          >
            Procurar
          </button>
        </p>
      </form>
    );
  }
}

InputSearch.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  artistName: PropTypes.string.isRequired,
};
