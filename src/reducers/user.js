// Esse reducer será responsável por tratar as informações da pessoa usuária

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

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USER_ACTION':
    return {
      ...state.user,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
