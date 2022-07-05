import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import UserProfileForm from '../components/UserProfileForm';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isUserInfoSaved: false,
      name: '',
      image: '',
      description: '',
      email: '',
    };
  }

  componentDidMount() {
    getUser()
      .then((userInfo) => {
        this.setState({
          ...userInfo,
          isLoading: false,
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleUserProfileUpdate = () => {
    const { name, description, image, email } = this.state;
    const user = {
      name,
      email,
      image,
      description,
    };
    this.setState({
      isLoading: true,
    }, () => {
      updateUser(user)
        .then(() => {
          this.setState({
            isLoading: false,
            isUserInfoSaved: true,
          });
        });
    });
  }

  validateUserInputs = () => {
    const { name, description, image } = this.state;
    return !(name && description && image && this.checkIsEmailValid());
  }

  // from https://www.w3schools.blog/email-validation-javascript-js
  checkIsEmailValid = () => {
    const { email } = this.state;
    const EMAIL_FORMAT = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return email.match(EMAIL_FORMAT);
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { isLoading, isUserInfoSaved } = this.state;
    return (
      <div>
        <Header />
        <article data-testid="page-profile-edit">
          {
            isLoading
              ? <Loading />
              : (
                <UserProfileForm
                  { ...this.state }
                  onInputChange={ this.handleInputChange }
                  onSubmit={ this.handleSubmit }
                  isBtnDisabled={ this.validateUserInputs() }
                  onUserUpdate={ this.handleUserProfileUpdate }
                />
              )
          }
        </article>
        {
          isUserInfoSaved && <Redirect to="/profile" />
        }
      </div>
    );
  }
}
