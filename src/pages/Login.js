import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { actionLogin } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    desativar: true,
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value }, this.verificaInput);
  }

  verificaInput = () => {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const seis = 6;
    const { email, senha } = this.state;
    if (email.length >= seis && email.match(mailformat) && senha.length >= seis) {
      this.setState({ desativar: false });
    } else {
      this.setState({ desativar: true });
    }
  }

  fazerLogin = () => {
    const { email } = this.state;
    const { saveLogin, history } = this.props;
    saveLogin(actionLogin(email));
    history.push('/carteira');
  }

  render() {
    const { email, senha, desativar } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            placeholder="email@eaxample.com"
            onChange={ this.onInputChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            name="senha"
            id="senha"
            value={ senha }
            onChange={ this.onInputChange }
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          disabled={ desativar }
          onClick={ this.fazerLogin }
        >
          Entrar

        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveLogin: (email) => dispatch(actionLogin(email)),
});

Login.propTypes = {
  saveLogin: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
