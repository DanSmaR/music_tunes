import React from 'react';
import PropTypes from 'prop-types';

export default function UserProfileForm(props) {
  const {
    description,
    email,
    image,
    name,
    onInputChange,
    onSubmit,
    isBtnDisabled,
    onUserUpdate,
  } = props;

  return (
    <form onSubmit={ onSubmit }>
      <p>
        <img src={ image } alt={ name } width="60px" height="60px" />
        <label htmlFor="userphoto">
          Insira um link da sua foto:
          <input
            type="url"
            name="image"
            id="userphoto"
            value={ image }
            onChange={ onInputChange }
            placeholder="https://image.url"
            data-testid="edit-input-image"
          />
        </label>
      </p>
      <p>
        <label htmlFor="username">
          Digite seu Nome:
          <input
            type="text"
            id="username"
            name="name"
            value={ name }
            onChange={ onInputChange }
            placeholder="Nome Usuário"
            data-testid="edit-input-name"
          />
        </label>
      </p>
      <p>
        <label htmlFor="usermail">
          Informe seu email:
          <input
            type="email"
            name="email"
            id="usermail"
            value={ email }
            onChange={ onInputChange }
            placeholder="usuario@mail.com"
            data-testid="edit-input-email"
          />
        </label>
      </p>
      <p>
        <label htmlFor="userinfo">
          Descrição
          <textarea
            name="description"
            id="userinfo"
            value={ description }
            onChange={ onInputChange }
            cols="30"
            rows="5"
            placeholder="Sobre mim"
            data-testid="edit-input-description"
          />
        </label>
      </p>
      <p>
        <button
          type="submit"
          data-testid="edit-button-save"
          disabled={ isBtnDisabled }
          onClick={ onUserUpdate }
        >
          Salvar
        </button>
        <span>
          {
            isBtnDisabled && 'Preencha todos os campos'
          }
        </span>
      </p>
    </form>
  );
}

UserProfileForm.propTypes = {
  description: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isBtnDisabled: PropTypes.bool.isRequired,
  onUserUpdate: PropTypes.func.isRequired,
};

UserProfileForm.defaultProps = {
  description: 'Informações sobre o usuário',
  email: 'usuario@mail.com',
  image: 'https://image.com',
};
