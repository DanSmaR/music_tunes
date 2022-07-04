import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
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

  render() {
    const { isLoading, musics, error } = this.state;
    console.log(musics);
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
                      <MusicCard tracks={ musics } />
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
