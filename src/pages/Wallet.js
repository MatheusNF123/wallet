import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { nanoid } from 'nanoid';
import Header from '../components/Header';
import Forms from '../components/Forms';
import Tabela from '../components/Tabela';
import { actionExpensesThunk,
  actionAtualizarListaGlobal, actionAtualizarLista } from '../actions';

class Wallet extends React.Component {
  state = {
    id: 0,
    value: 0,
    description: 'Nenhuma Descrição',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',

  }

  onInputChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  addDespesa = () => {
    const { currency, value, /* somas, */ description, method, tag } = this.state;
    // this.setState((a) => ({ id: a.id + 1 }));
    const id = nanoid();
    // console.log(algumacoisa);
    // this.setState({ id: id + 1 });
    const { enviarGastos, usuario: { email }, despesas } = this.props;
    enviarGastos({ id, value, description, currency, method, tag, email }, despesas);

    this.setState({
      value: '',
      description: '',
    });
  }

  pegarEstadoDoForm = () => {
    const { currency, value, description, method, tag } = this.state;
    const { idE, minhaLista, atualizarListaEditada } = this.props;
    const listaNova = minhaLista.map((elemento) => {
      if (elemento.id === idE) {
        elemento = { ...elemento, currency, value, description, method, tag };
      }
      return elemento;
    });
    // console.log(listaNova);
    atualizarListaEditada(listaNova);
    this.setState({
      value: '',
      description: '',
    });
  }

  passarParaEstado = (param) => {
    this.setState({ ...param });
  }

  render() {
    const { editar } = this.props;
    return (
      <>
        <Header />

        <Forms
          { ...this.state }
          // moeda={ moeda }
          editar={ editar }
          onInputChange={ this.onInputChange }
          pegarEstadoDoForm={ this.pegarEstadoDoForm }
          addDespesa={ this.addDespesa }
        />

        {/* <Forms /> */}
        <Tabela passarParaEstado={ this.passarParaEstado } />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  enviarGastos: (param, gastos) => dispatch(actionExpensesThunk(param, gastos)),
  atualizarListaEditada: (lista) => dispatch(actionAtualizarListaGlobal(lista)),
  atualizarExpense: (param) => dispatch(actionAtualizarLista(param)),

});

const mapStateToProps = (state) => ({
  // moeda: state.wallet.currencies,
  minhaLista: state.wallet.expenses,
  editar: state.wallet.editar,
  idE: state.wallet.id,
  obj: state.wallet.obj,
  usuario: state.user.usuario,
  despesas: state.wallet.expenses,
});

Wallet.propTypes = {
  editar: propTypes.bool,
  moeda: propTypes.arrayOf(propTypes.string).isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
