// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const CURRENCIES = 'actionCurrencies';
export const EXPENSES = 'EXPENSES';

export const actionLogin = (email) => ({ type: LOGIN, payload: email });

export const actionCurrencies = (moeda, obj) => (
  { type: CURRENCIES, payload: moeda, obj });

export const actionExpenses = (desp, soma) => ({ type: EXPENSES, payload: desp, soma });

export const actionCurrencieThunk = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    const todasMoedas = Object.keys(json).filter((elemento) => elemento !== 'USDT');
    dispatch(actionCurrencies(todasMoedas, json));
  } catch (e) {
    console.log(e);
  }
};

export const actionExpensesThunk = (param, somaTudo) => async (dispatch) => {
  const obj = { ...param };
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    // const todasMoedas = Object.values(json).filter((elemento) => elemento);
    dispatch(actionExpenses({ ...obj, exchangeRates: json }, somaTudo));
  } catch (e) {
    console.log(e);
  }
};
