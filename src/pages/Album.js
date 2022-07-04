import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      favoriteSongIdList: [],
      isLoading: true,
      error: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      isLoading: true,
      error: '',
    }, () => {
      getMusics(id)
        .then((musics) => {
          this.setState({
            musics,
          });
        })
        .then(() => {
          this.getFavoriteIdSongsFromLocalStorage();
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            error: 'Requisição falhou',
            isLoading: false,
          });
        });
    });
  }

  getListOfSongsId = (favSongs) => favSongs
    .map((song) => song.trackId);

  updateFavoriteSongIdListState = (songsId) => {
    this.setState({
      favoriteSongIdList: songsId,
      isLoading: false,
    });
  }

  getFavoriteIdSongsFromLocalStorage = () => getFavoriteSongs()
    .then(this.getListOfSongsId)
    .then(this.updateFavoriteSongIdListState);

  // getFavoriteIdSongsFromLocalStorage() ends here

  removeFavoriteSong= (track) => {
    this.setState({
      isLoading: true,
    }, () => {
      removeSong(track)
        .then(() => {
          getFavoriteSongs()
            .then(this.getListOfSongsId)
            .then(this.updateFavoriteSongIdListState);
        });
    });
  }

  isSongSavedLocalStorage = (track) => {
    const { favoriteSongIdList } = this.state;
    return favoriteSongIdList.find((song) => song === track.trackId);
  }

  handleFavoriteSong = (track) => {
    if (this.isSongSavedLocalStorage(track)) {
      this.removeFavoriteSong(track);
      return;
    }
    const { favoriteSongIdList } = this.state;
    favoriteSongIdList.push(track.trackId);
    this.setState({
      isLoading: true,
    }, () => {
      addSong(track)
        .then(() => {
          this.setState({
            isLoading: false,
            favoriteSongIdList,
          });
        });
    });
  }

  render() {
    const { isLoading, musics, error, favoriteSongIdList } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          {
            isLoading
              ? <Loading />
              : (
                error
                || (
                  <main>
                    <section>
                      <AlbumCard
                        albumCover={ musics[0].artworkUrl100 }
                        AlbumName={ musics[0].collectionName }
                        artistName={ musics[0].artistName }
                      />
                    </section>
                    <section>
                      <MusicCard
                        tracks={ musics }
                        onFavoriteAddSong={ this.handleFavoriteSong }
                        favoriteSongsId={ favoriteSongIdList }
                      />
                    </section>
                  </main>
                )
              )
          }
        </div>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
