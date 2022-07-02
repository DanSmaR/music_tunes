import React from 'react';
import PropTypes from 'prop-types';

export default function InputLogin(props) {
  const MIN_NAME_LENGTH = 3;
  const { onInputChange, onClickBtn, onSubmit, profile: { name } } = props;
  return (
    <div>
      <form onSubmit={ onSubmit }>
        <h2>Login</h2>
        <p>
          <label htmlFor="user-name">
            <input
              data-testid="login-name-input"
              type="text"
              id="user-name"
              name="name"
              value={ name }
              onChange={ onInputChange }
              placeholder="Nome"
            />
          </label>
        </p>
        <p>
          <button
            data-testid="login-submit-button"
            type="submit"
            onClick={ onClickBtn }
            disabled={ (name.length < MIN_NAME_LENGTH) }
          >
            Entrar
          </button>
        </p>
      </form>
    </div>
  );
}

InputLogin.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onClickBtn: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
