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
      userInput: {
        name: '',
        artistName: '',
      },
      isLoading: false,
      isLoggedIn: false,
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      userInput: {
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
    const { userInput, isLoading, isLoggedIn } = this.state;
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
              userInput={ userInput }
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
              userInput={ userInput }
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
