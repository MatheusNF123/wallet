import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { actionCurrencieThunk } from '../actions';

class Header extends React.Component {
  componentDidMount() {
    const { curr } = this.props;
    curr();
    this.adicionaValor();
  }

  adicionaValor = () => {
    // const dez = 10;
    const { lista } = this.props;
    return lista.reduce((acc, curr) => {
      const valorConvertido = curr.value * curr.exchangeRates[curr.currency].ask;
      acc += valorConvertido;
      return acc;
    }, 0);
  }

  render() {
    const { email /* soma = 0 */ } = this.props;
    return (
      <header>
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field">
          {/* {parseFloat(soma).toFixed(2)} */}
          {parseFloat(this.adicionaValor()).toFixed(2)}

        </div>

        <div data-testid="header-currency-field">BRL</div>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  curr: () => dispatch(actionCurrencieThunk()),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  moeda: state.wallet.currencies,
  soma: state.wallet.soma,
  lista: state.wallet.expenses,

});

Header.propTypes = {
  email: propTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
