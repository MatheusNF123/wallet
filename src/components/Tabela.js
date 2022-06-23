import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { actionAtualizarLista } from '../actions';

class Tabela extends React.Component {
  deletaDaLista = (id, preco) => {
    console.log(preco);
    const { lista, atualizarGastosELista } = this.props;
    const objetoDaLista = lista.filter((elemento) => elemento.id !== id);
    atualizarGastosELista(objetoDaLista, preco);
  }

  render() {
    const { lista } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {lista.length > 0 && lista.map((elemento, index) => (
            <tr key={ `${elemento.description}${index} ` }>

              <td>{elemento.description}</td>
              <td>{elemento.tag}</td>
              <td>{elemento.method}</td>
              <td>{parseFloat(elemento.value).toFixed(2) }</td>
              <td>{[elemento.exchangeRates[elemento.currency].name]}</td>
              <td>
                {parseFloat(elemento.exchangeRates[elemento
                  .currency].ask).toFixed(2)}

              </td>
              <td>
                {(parseFloat(elemento
                  .value * elemento
                  .exchangeRates[elemento.currency].ask)).toFixed(2)}

              </td>
              <td>Real</td>
              <td>

                <button type="button">Editar</button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.deletaDaLista(elemento.id, parseFloat(elemento
                    .value).toFixed(2) * parseFloat(elemento
                    .exchangeRates[elemento.currency].ask).toFixed(2)) }
                >
                  Excluir

                </button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  atualizarGastosELista: (param1,
    param2) => dispatch(actionAtualizarLista(param1, param2)),
});

const mapStateToProps = (state) => ({
  lista: state.wallet.expenses,
});

Tabela.propTypes = {
  lista: propTypes.arrayOf(propTypes.shape({})).isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Tabela);
