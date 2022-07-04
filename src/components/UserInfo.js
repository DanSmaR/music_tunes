import React from 'react';
import PropTypes from 'prop-types';

export default function UserInfo(props) {
  const { description, email, image, name } = props;
  return (
    <article>
      <img
        src={ image }
        alt={ name }
        width="100px"
        height="100px"
        data-testid="profile-image"
      />
      <section>
        <h3>Nome</h3>
        <p>{ name }</p>
      </section>
      <section>
        <h3>Email</h3>
        <p>{ email }</p>
      </section>
      <section>
        <h3>Descrição</h3>
        <p>{ description }</p>
      </section>
    </article>
  );
}

UserInfo.propTypes = {
  description: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
};

UserInfo.defaultProps = {
  description: 'Descrição sobre o usuário',
  email: 'usuario@email.com',
  image: '',
};
