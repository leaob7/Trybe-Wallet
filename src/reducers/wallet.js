// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const WALLET_EXPENSE = 'WALLET_EXPENSE';
const SAVE_EXPENDS = 'SAVE_EXPENDS';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_EXPENSE:
    return {
      ...state,
      expenses: [...state.wallet.expenses, { id: state.wallet.expenses.length, ...action.payload }],
    };
  default:
    return state;
  }
};

export default wallet;
