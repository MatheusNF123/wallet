import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { actionCurrencieThunk } from '../actions';

class Header extends React.Component {
  componentDidMount() {
    const { curr } = this.props;
    curr();
    this.adicionaValor();
  }

  adicionaValor = () => {
    const { lista, usuario: { email } } = this.props;
    return lista.reduce((acc, curr) => {
      if (curr.email === email) {
        const valorConvertido = curr.value * curr.exchangeRates[curr.currency].ask;
        acc += valorConvertido;
        return acc;
      }
      return acc;
    }, 0);
  }

  render() {
    const { usuario } = this.props;
    return (
      <header className="containerHeader">
        <div className="contentHeader">
          <div className="contentLogo">
            <div className="imgHeader">
              <img src="https://cdn-icons-png.flaticon.com/512/214/214362.png" alt="imagemCarteira" />
            </div>
            <Link to="/">
              <div className="nomeHeader">MyWallet</div>
            </Link>

          </div>

          <div className="contentEmail">
            <span className="material-symbols-outlined user">
              account_circle
            </span>
            <div
              data-testid="email-field"
              className="email"
            >
              {usuario.nome || 'usuario'}

            </div>
            <span className="material-symbols-outlined coin">
              database
            </span>
            <div className="rs">R$:</div>

            <div data-testid="total-field" className="valorHeader">
              {parseFloat(this.adicionaValor()).toFixed(2)}

            </div>

            <div data-testid="header-currency-field" className="brl">BRL</div>
          </div>
        </div>

      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  curr: () => dispatch(actionCurrencieThunk()),
});

const mapStateToProps = (state) => ({
  usuario: state.user.usuario,
  moeda: state.wallet.currencies,
  lista: state.wallet.expenses,

});

Header.propTypes = {
  usuario: propTypes.shape({
    nome: propTypes.string,
    sobreNome: propTypes.string,
    email: propTypes.string,
    senha: propTypes.string,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
