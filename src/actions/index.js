// Coloque aqui suas actions
const WALLET_EXPENSE = 'WALLET_EXPENSE';

export const addEmail = (email) => ({ type: 'USER_ACTION', email });

export const addExpenses = (state, exchangeRates) => ({
  type: WALLET_EXPENSE,
  payload: {
    ...state,
    exchangeRates,
  },
});

export const fetchExchange = (state) => async (dispatch) => {
  const requisition = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await requisition.json();
  delete data.USDT;
  dispatch(addExpenses(state, data));
};
