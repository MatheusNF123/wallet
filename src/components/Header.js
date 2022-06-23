import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { actionCurrencieThunk } from '../actions';

class Header extends React.Component {
  // state = {
  //   soma: 0,
  // }

  componentDidMount() {
    const { curr } = this.props;
    curr();
    this.somar();
  }

  somar = () => {
    const { valores } = this.props;
    const result = valores
      ?.reduce((acc, elemento) => {
        // const curr = elemento.exanchanges[elemento.currency].ask;
        console.log(elemento.exanchanges);
        // .find((element) => elemento.currency === element.code);
        acc = Number(elemento.value) * Number(curr.ask);
        return acc;
      }, 0);
    console.log(result);
    // this.setState({ soma: result });
  }

  render() {
    const { email, soma = 0 } = this.props;
    // const { soma } = this.state;
    return (
      <header>
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field">
          {soma}

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
  valores: state.wallet.expenses,
  soma: state.wallet.soma,
});

Header.propTypes = {
  email: propTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
