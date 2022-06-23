import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { actionExpensesThunk } from '../actions';

class Forms extends React.Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: '',
    method: '',
    tag: '',
    somas: 0,
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  addDespesa = () => {
    const { id, currency, value, somas, description, method, tag } = this.state;
    // this.setState((a) => ({ id: a.id + 1 }));
    this.setState({ id: id + 1 });
    const { enviarGastos, objetoC } = this.props;
    const soma = somas + objetoC[currency].ask * value;
    enviarGastos({ id, value, description, currency, method, tag }, soma.toFixed(2));
    this.setState({ somas: soma,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '' });
  }

  render() {
    const { moeda } = this.props;
    const { value, description, currency, method,
      tag } = this.state;
    return (
      <form>
        <label htmlFor="despesas">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            id="value"
            onChange={ this.onInputChange }
            value={ value }
          />
        </label>
        Descrição:
        <label htmlFor="description">
          <textarea
            name="description"
            id="description"
            cols="15"
            rows="5"
            data-testid="description-input"
            onChange={ this.onInputChange }
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.onInputChange }
          >
            { moeda.map((elemento) => (
              <option
                key={ elemento }
              >
                {elemento}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Metodo de Pagamento
          <select
            name="method"
            id="method"
            data-testid="method-input"
            onChange={ this.onInputChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

        </label>
        <label htmlFor="tag">
          Tag
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            onChange={ this.onInputChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.addDespesa }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  enviarGastos: (param, param2) => dispatch(actionExpensesThunk(param, param2)),
});

const mapStateToProps = (state) => ({
  moeda: state.wallet.currencies,
  objetoC: state.wallet.objetoCompleto,
});

Forms.propTypes = {
  moeda: propTypes.arrayOf(propTypes.string).isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
