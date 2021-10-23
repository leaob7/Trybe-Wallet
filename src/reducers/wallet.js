// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const WALLET_EXPENSE = 'WALLET_EXPENSE';
const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
    };
  default:
    return state;
  }
};

export default wallet;
