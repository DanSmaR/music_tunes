import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, readFavoriteSongs } from '../services/favoriteSongsAPI';

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
            isLoading: false,
            favoriteSongIdList: this.getFavoriteIdSongsFromLocalStorage(),
          });
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

  getFavoriteIdSongsFromLocalStorage = () => {
    const savedSongs = readFavoriteSongs();
    return savedSongs.map((song) => song.trackId);
  }

  isSongSavedLocalStorage = (track) => {
    const savedSongs = readFavoriteSongs();
    return savedSongs.find((song) => song.trackId === track.trackId);
  }

  handleFavoriteSong = (track) => {
    console.log(track);
    if (this.isSongSavedLocalStorage(track)) {
      console.log('Já está nas favoritas');
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
