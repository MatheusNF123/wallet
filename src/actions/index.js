// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const CADASTRO = 'CADASTRO';
export const CURRENCIES = 'actionCurrencies';
export const EXPENSES = 'EXPENSES';
export const ATUALIZAR = 'ATUALIZAR';
export const EDITALISTA = 'EDITALISTA';
export const NOVALISTAEIDATA = 'NOVALISTAEIDATA';
export const VOLTARBOTAO = 'VOLTARBOTAO';

export const actionLogin = (email) => ({ type: LOGIN, payload: email });
export const actionCadastro = (email) => ({ type: CADASTRO, payload: email });

export const actionCurrencies = (moeda, obj) => (
  { type: CURRENCIES, payload: moeda, obj });

export const actionExpenses = (desp) => ({ type: EXPENSES, payload: desp });

export const actionAtualizarLista = (lista) => ({ type: ATUALIZAR,
  payload: lista,
});

export const actionEditaLista = (id) => ({ type: EDITALISTA, id });

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

export const actionExpensesThunk = (param, gastos) => async (dispatch) => {
  console.log(gastos);
  const obj = { ...param };
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    // console.log('antes');
    // const todasDespesas = [...gastos, { ...obj, exchangeRates: json }];
    // localStorage.setItem('despesas', JSON.stringify(todasDespesas));
    // console.log('depois');
    dispatch(actionExpenses({ ...obj, exchangeRates: json }));
  } catch (e) {
    console.log(e);
  }
};

export const actionAtualizarListaGlobal = (listaEditada) => (
  { type: NOVALISTAEIDATA, payload: listaEditada });
