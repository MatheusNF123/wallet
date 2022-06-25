import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Forms extends React.Component {
  render() {
    const { value, description, currency, method,
      tag, moeda, editar, addDespesa, onInputChange, pegarEstadoDoForm } = this.props;
    return (
      <section className="containerForm">
        <form className="form">
          <label htmlFor="despesas">
            Valor
            <input
              data-testid="value-input"
              type="number"
              name="value"
              id="value"
              onChange={ onInputChange }
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              name="description"
              id="description"
              data-testid="description-input"
              onChange={ onInputChange }
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              id="currency"
              value={ currency }
              onChange={ onInputChange }
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
              onChange={ onInputChange }
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
              onChange={ onInputChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {!editar
            ? (
              <button
                type="button"
                onClick={ addDespesa }
                className="btnAdd"
                disabled={ !(value.length > 0 && description.length > 0) }
              >
                Adicionar despesa

              </button>)
            : (
              <button
                type="button"
                onClick={ pegarEstadoDoForm }
                className="btnEditar"
              >
                Editar Despesas
              </button>
            )}

        </form>
      </section>
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
