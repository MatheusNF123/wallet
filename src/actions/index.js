// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const CURRENCIES = 'actionCurrencies';

export const actionLogin = (email) => ({ type: LOGIN, payload: email });

export const actionCurrencies = (moeda) => ({ type: CURRENCIES, payload: moeda });

export const actionCurrencieThunk = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    // if (json) {
    const todasMoedas = Object.keys(json).filter((elemento) => elemento !== 'USDT');
    dispatch(actionCurrencies(todasMoedas));
    // }
  } catch (e) {
    console.log(e);
  }
};
