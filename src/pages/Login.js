import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { actionLogin } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    desativar: true,
    validaSenha: false,
    validaEmail: false,
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value }, this.verificaInput);
  }

  verificaInput = () => {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const seis = 6;
    const tres = 3;
    const { email, senha } = this.state;
    if (email.length >= seis && email.match(mailformat) && senha.length >= tres) {
      this.setState({ desativar: false });
    } else {
      this.setState({ desativar: true });
    }
  }

  fazerLogin = () => {
    const { email, senha } = this.state;
    const { saveLogin, usuario, history } = this.props;
    const logarUsuario = usuario.find((elemento) => elemento.email === email);
    if (logarUsuario) {
      this.setState({ validaEmail: false });
      if (logarUsuario.senha === senha) {
        saveLogin(logarUsuario);
        this.setState({ validaSenha: false });
        history.push('/carteira');
      } else {
        this.setState({ validaSenha: true, validaEmail: false });
      }
    } else {
      this.setState({ validaEmail: true, validaSenha: false });
    }
  }

  cadastrar = () => {
    const { history } = this.props;
    history.push('/cadastrar');
  }

  render() {
    const { email, senha, desativar, validaSenha, validaEmail } = this.state;
    return (
      <section className="container">
        <h1 className="tituloLogin">MyWallet</h1>
        <article className="content">
          <div className="imgLogin">
            <img
              src="https://cdn-icons-png.flaticon.com/512/214/214362.png"
              alt="imagemCarteira"
            />
          </div>
          <label htmlFor="email">

            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              placeholder="Email: email@eaxample.com"
              onChange={ this.onInputChange }
              data-testid="email-input"
            />
          </label>
          {validaEmail
         && <div className="spanAlertaEmail">não foi possivel encontrar sua conta</div>}
          <label htmlFor="senha">

            <input
              type="password"
              name="senha"
              id="senha"
              value={ senha }
              onChange={ this.onInputChange }
              data-testid="password-input"
              placeholder="Senha:"
            />

          </label>
          {validaSenha && <div className="spanAlertaSenha">senha incorreta</div>}
          <button
            className={ !desativar ? 'backGroundTrue' : 'backGroundFalse' }
            type="button"
            disabled={ desativar }
            onClick={ this.fazerLogin }
          >
            Entrar
          </button>
          <button
            className="cadastro"
            type="button"
            onClick={ this.cadastrar }
          >
            Cadastrar
          </button>
        </article>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.user.cadastro,
});

const mapDispatchToProps = (dispatch) => ({
  saveLogin: (email) => dispatch(actionLogin(email)),
});

Login.propTypes = {
  saveLogin: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  usuario: propTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
