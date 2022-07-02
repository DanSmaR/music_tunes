import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      profile: {},
    };
  }

  componentDidMount() {
    getUser()
      .then((user) => {
        this.setState({
          isLoading: false,
          profile: user,
        });
      });
  }

  render() {
    const { isLoading, profile: { name } } = this.state;
    return (
      <header data-testid="header-component">
        <NavLink data-testid="link-to-search" to="/search">Pesquisa</NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">Favoritos</NavLink>
        <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
        {
          isLoading ? <Loading /> : <span data-testid="header-user-name">{ name }</span>
        }
      </header>
    );
  }
}
