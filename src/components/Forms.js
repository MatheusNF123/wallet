import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Forms extends React.Component {
  render() {
    const { moeda } = this.props;
    return (
      <form>
        <label htmlFor="despesas">
          <input data-testid="value-input" type="text" name="despesas" id="despesas" />
        </label>
        <label htmlFor="descricao-despesas">
          <textarea
            name="descricao-despesas"
            id="descricao-despesas"
            cols="15"
            rows="5"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="moedas">
          Moeda:
          <select name="moedas" id="moedas">
            { moeda.map((elemento) => (
              <option
                key={ elemento }
              >
                {elemento}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="metodoPagamento">
          metodoPagamento
          <select
            name="metodoPagamento"
            id="metodoPagamento"
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

        </label>
        <label htmlFor="todasDespesas">
          <select name="todasDespesas" id="todasDespesas" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  moeda: state.wallet.currencies,
});

Forms.propTypes = {
  moeda: propTypes.arrayOf(propTypes.string).isRequired,
}.isRequired;

export default connect(mapStateToProps)(Forms);
