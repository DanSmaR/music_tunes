import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createUser } from './services/userAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      artistName: '',
      _artistName: '',
      albums: [],
      isLoading: false,
      isLoggedIn: false,
      error: '',
    };
  }

  handleAlbumsSearch = ({ target }) => {
    target.parentElement.previousSibling.children[0].focus();
    const { artistName } = this.state;
    this.setState({
      isLoading: true,
      _artistName: artistName,
      error: '',
    }, () => {
      searchAlbumsAPI(artistName)
        .then((albums) => {
          console.log(albums);
          this.setState({
            albums,
            isLoading: false,
            artistName: '',
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            error: 'Requisição falhou. Tente outro Artista',
            isLoading: false,
          });
        });
    });
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleLogin = () => {
    const { userName } = this.state;
    const profile = {
      name: userName,
    };
    this.setState({
      isLoading: true,
    }, () => {
      createUser(profile)
        .then(() => {
          this.setState({
            isLoggedIn: true,
            isLoading: false,
          });
        });
    });
  }

  render() {
    const {
      userName,
      artistName,
      _artistName,
      isLoading,
      isLoggedIn,
      albums,
      error,
    } = this.state;

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={ (routeProps) => (<Login
              { ...routeProps }
              onInputChange={ this.handleInputChange }
              onSubmit={ this.handleSubmit }
              onClickBtn={ this.handleLogin }
              userName={ userName }
              isLoading={ isLoading }
              isLoggedIn={ isLoggedIn }
            />) }
          />
          <Route
            path="/search"
            render={ (routeProps) => (<Search
              { ...routeProps }
              onInputChange={ this.handleInputChange }
              onSubmit={ this.handleSubmit }
              onAlbumSearch={ this.handleAlbumsSearch }
              artistName={ artistName }
              _artistName={ _artistName }
              isLoading={ isLoading }
              albums={ albums }
              error={ error }
            />) }
          />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
