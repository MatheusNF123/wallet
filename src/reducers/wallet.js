// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES, EXPENSES, ATUALIZAR } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  objetoCompleto: {},
  soma: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return { ...state,
      currencies: action.payload,
      objetoCompleto: action.obj };
  case EXPENSES:
    return { ...state,
      expenses: [...state.expenses, action.payload],
      soma: Number(state.soma) + Number(action.soma) };
  case ATUALIZAR:
    return { ...state,
      expenses: action.payload,
      soma: Number(state.soma) - Number(action.subtrai),
    };
  default: return state;
  }
};

export default walletReducer;
