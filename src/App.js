import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createUser } from './services/userAPI';
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
      profile: {
        name: '',
      },
      isLoading: false,
      isLoggedIn: false,
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      profile: {
        [name]: value,
      },
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleLogin = () => {
    const { profile } = this.state;
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
    const { profile, isLoading, isLoggedIn } = this.state;
    return (
      <div>
        <h1>Trybe Tunes</h1>
        <Switch>
          <Route
            exact
            path="/"
            render={ (routeProps) => (<Login
              { ...routeProps }
              onInputChange={ this.handleInputChange }
              onSubmit={ this.handleSubmit }
              onClickBtn={ this.handleLogin }
              profile={ profile }
              isLoading={ isLoading }
              isLoggedIn={ isLoggedIn }
            />) }
          />
          <Route path="/search" component={ Search } />
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
