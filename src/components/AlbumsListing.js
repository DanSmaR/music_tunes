import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AlbumsListing extends Component {
  showAlbumList = () => {
    const { albums, _artistName } = this.props;
    if (albums.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <section>
        <p>{ `Resultado de álbuns de: ${_artistName}` }</p>
        <div className="cards">
          {
            albums.map((album) => (
              <Link
                key={ album.collectionId }
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <article className="card">
                  <img
                    src={ album.artworkUrl100 }
                    alt="Album art cover"
                    width="300px"
                    height="250px"
                  />
                  <h3>{ album.collectionName }</h3>
                  <p>{ album.artistName }</p>
                </article>
              </Link>
            ))
          }
        </div>
      </section>
    );
  }

  render() {
    const { error } = this.props;
    return (
      <div>
        {
          error || this.showAlbumList()
        }
      </div>
    );
  }
}

AlbumsListing.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  _artistName: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};
