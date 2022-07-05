import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.setFavoriteSongs();
  }

  setFavoriteSongs = () => {
    getFavoriteSongs()
      .then((songs) => {
        this.setState({
          favoriteSongs: songs,
          isLoading: false,
        });
      });
  }

  removeFavoriteSong = (track) => {
    this.setState({
      isLoading: true,
    }, () => {
      removeSong(track)
        .then(() => {
          this.setFavoriteSongs();
        });
    });
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div>
        <Header />
        <article data-testid="page-favorites">
          <h2>Musicas favoritas</h2>
          <section>
            {
              isLoading
                ? <Loading />
                : (
                  <MusicCard
                    tracks={ favoriteSongs }
                    onFavoriteSongChange={ this.removeFavoriteSong }
                    favoriteSongsId={ favoriteSongs.map((song) => song.trackId) }
                  />
                )
            }
          </section>
        </article>
      </div>
    );
  }
}
