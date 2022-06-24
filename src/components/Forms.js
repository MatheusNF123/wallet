import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
// import { actionExpensesThunk, actionAtualizarListaGlobal } from '../actions';

class Forms extends React.Component {
  // state = {
  //   id: 0,
  //   value: 0,
  //   description: '',
  //   currency: 'USD',
  //   method: '',
  //   tag: '',

  // }

  // onInputChange = ({ target }) => {
  //   const { name } = target;
  //   this.setState({ [name]: target.value });
  // }

  // addDespesa = () => {
  //   const { id, currency, value, /* somas, */ description, method, tag } = this.state;
  //   // this.setState((a) => ({ id: a.id + 1 }));
  //   this.setState({ id: id + 1 });
  //   const { enviarGastos } = this.props;
  //   enviarGastos({ id, value, description, currency, method, tag });
  //   this.setState({
  //     value: '',
  //     description: '',
  //     currency: '',
  //     method: '',
  //     tag: '' });
  // }

  // pegarEstadoDoForm = () => {
  //   const { currency, value, description, method, tag } = this.state;
  //   const { idE, minhaLista, atualizarListaEditada } = this.props;
  //   const listaNova = minhaLista.map((elemento) => {
  //     if (elemento.id === idE) {
  //       elemento = { ...elemento, currency, value, description, method, tag };
  //     }
  //     return elemento;
  //   });
  //   // console.log(listaNova);
  //   atualizarListaEditada(listaNova);
  // }

  render() {
    // const { moeda, editar } = this.props;
    const { value, description, currency, method,
      tag, moeda, editar, addDespesa, onInputChange, pegarEstadoDoForm } = this.props;
    return (
      <form>
        <label htmlFor="despesas">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            id="value"
            onChange={ onInputChange }
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
            onChange={ onInputChange }
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
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
          ? (<button type="button" onClick={ addDespesa }>Adicionar despesa</button>)
          : (
            <button
              type="button"
              onClick={ pegarEstadoDoForm }
            >
              Editar Despesas
            </button>)}

      </form>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   enviarGastos: (param) => dispatch(actionExpensesThunk(param)),
//   atualizarListaEditada: (lista) => dispatch(actionAtualizarListaGlobal(lista)),
// });

const mapStateToProps = (state) => ({
  moeda: state.wallet.currencies,
  // minhaLista: state.wallet.expenses,
  // editar: state.wallet.editar,
  // idE: state.wallet.id,
});

// Forms.propTypes = {
//   moeda: propTypes.arrayOf(propTypes.string).isRequired,
// }.isRequired;
Forms.propTypes = {
  moeda: propTypes.arrayOf(propTypes.string).isRequired,
}.isRequired;

export default connect(mapStateToProps)(Forms);
