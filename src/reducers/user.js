// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN, CADASTRO } from '../actions';

const INITIAL_STATE = {
  cadastro: localStorage
    .getItem('user') ? JSON.parse(localStorage.getItem('user')) : [],
  usuario: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, usuario: action.payload };
  case CADASTRO:
    return { ...state, cadastro: [...state.cadastro, action.payload] };
  default: return state;
  }
};

export default userReducer;
