import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { actionCadastro } from '../actions';

class Cadastrar extends React.Component {
  state = {
    nome: '',
    sobreNome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    desativar: true,
    usuarioExistente: false,
  }

  // componentDidMount() {
  //   const getLoal = localStorage
  //     .getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
  //   this.setState({ listaDeUsuarios: getLoal });
  // }

  onInputChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value }, this.verificaInput);
  }

  verificaInput = () => {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const seis = 6;
    const tres = 3;
    const { nome, email, senha, confirmarSenha } = this.state;
    if (email.length >= seis && email.match(mailformat)
     && senha.length >= tres && nome.length >= tres && senha === confirmarSenha) {
      this.setState({ desativar: false });
    } else {
      this.setState({ desativar: true });
    }
  }

  fazerCadastro = () => {
    const { nome, sobreNome, email, senha } = this.state;
    const { fazerCadastro, usuario /* cadastro */ } = this.props;
    if (usuario.length > 0) {
      const usuarioJaExiste = usuario.some((user) => user.email === email);
      if (usuarioJaExiste) {
        this.setState({ usuarioExistente: true });
      } else {
        this.setState({ usuarioExistente: false,
          nome: '',
          sobreNome: '',
          email: '',
          senha: '',
          confirmarSenha: '' });
        const newUser = { nome, sobreNome, email, senha };
        // const usuariosLocal = [...cadastro, newUser];
        // localStorage.setItem('user', JSON.stringify(usuariosLocal));
        fazerCadastro(newUser);
      }
    } else {
      this.setState({ usuarioExistente: false,
        nome: '',
        sobreNome: '',
        email: '',
        senha: '',
        confirmarSenha: '' });
      const newUser = { nome, sobreNome, email, senha };
      fazerCadastro(newUser);
      // const usuariosLocal = [...cadastro, newUser];
      // localStorage.setItem('user', JSON.stringify(usuariosLocal));
    }
  }

  render() {
    const { nome, sobreNome, email, senha,
      confirmarSenha, desativar, usuarioExistente } = this.state;
    return (

      <section className="containerCadastro">
        <article className="formCadastro">
          <h4 className="tituloCadastro">Cadastre-se</h4>
          <form action="" className="cadastrar">
            <div className="divinputEmail">

              <input
                type="text"
                name="nome"
                id="nome"
                value={ nome }
                onChange={ this.onInputChange }
                placeholder="Nome"
              />

              <input
                type="text"
                name="sobreNome"
                id="sobreNome"
                value={ sobreNome }
                onChange={ this.onInputChange }
                placeholder="Sobrenome"
              />

            </div>
            <label htmlFor="email" className="labelEmailCadastro">
              <input
                type="text"
                name="email"
                id="email"
                value={ email }
                onChange={ this.onInputChange }
                placeholder="Seu endereço de e-mail"
                className="emailCadastro"
              />
              { usuarioExistente
              && (
                <span
                  className="spanEmailExistente"
                >
                  Email indisponivel

                </span>
              )}
            </label>
            <div className="inputSenhaEConfirma">
              <input
                type="password"
                name="senha"
                id="senha"
                value={ senha }
                onChange={ this.onInputChange }
                placeholder="Senha"
              />

              <input
                type="password"
                name="confirmarSenha"
                id="confirmarSenha"
                value={ confirmarSenha }
                onChange={ this.onInputChange }
                placeholder="Confirmar"
              />
            </div>
            <div className="buttonLink">
              <button
                type="button"
                disabled={ desativar }
                onClick={ this.fazerCadastro }
              >
                Cadastrar

              </button>
              <Link to="/">Fazer Login</Link>
            </div>
          </form>
        </article>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  usuario: state.user.cadastro,
  cadastro: state.user.cadastro,
});

const mapDispatchToProps = (dispatch) => ({
  fazerCadastro: (user) => dispatch(actionCadastro(user)),
});

Cadastrar.propTypes = {
  fazerCadastro: propTypes.func.isRequired,
  usuario: propTypes.arrayOf(Object).isRequired,
  // cadastro: propTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cadastrar);
