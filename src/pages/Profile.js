import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import UserInfo from '../components/UserInfo';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userInfo: {},
    };
  }

  componentDidMount() {
    getUser()
      .then((userInfo) => {
        this.setState({
          userInfo,
          isLoading: false,
        });
      });
  }

  render() {
    const { isLoading, userInfo } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-profile">
          {
            isLoading ? <Loading /> : <UserInfo { ...userInfo } />
          }
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </div>
    );
  }
}
