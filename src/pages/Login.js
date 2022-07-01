import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import InputLogin from '../components/InputLogin';
import Loading from '../components/Loading';

class Login extends Component {
  render() {
    const { isLoading, isLoggedIn } = this.props;
    return (
      <div data-testid="page-login">
        {
          !isLoading ? <InputLogin { ...this.props } /> : <Loading />
        }
        {
          isLoggedIn && <Redirect push to="/search" />
        }
      </div>
    );
  }
}

export default Login;
