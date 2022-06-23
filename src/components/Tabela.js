import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Tabela extends React.Component {
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
              <td>{Number(elemento.value).toFixed(2)}</td>
              <td>{[elemento.exchangeRates[elemento.currency].name]}</td>
              <td>{Number(elemento.exchangeRates[elemento.currency].ask).toFixed(2)}</td>
              <td>
                {(Number(elemento
                  .value) * Number(elemento
                  .exchangeRates[elemento.currency].ask)).toFixed(2)}

              </td>
              <td>Real</td>
              <td>

                <button type="button">Editar</button>
                <button type="button">Excluir</button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  lista: state.wallet.expenses,
});

Tabela.propTypes = {
  lista: propTypes.arrayOf(propTypes.shape({})).isRequired,
}.isRequired;

export default connect(mapStateToProps)(Tabela);
