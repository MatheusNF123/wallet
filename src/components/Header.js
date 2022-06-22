import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { actionCurrencieThunk } from '../actions';

class Header extends React.Component {
  componentDidMount() {
    const { curr } = this.props;
    curr();
  }

  render() {
    const { email } = this.props;

    return (
      <header>
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field">0</div>

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
});

Header.propTypes = {
  email: propTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
