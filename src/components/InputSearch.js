import React, { Component } from 'react';

export default class InputSearch extends Component {
  render() {
    const { onInputChange, onSubmit, userInput: { artistName } } = this.props;
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
