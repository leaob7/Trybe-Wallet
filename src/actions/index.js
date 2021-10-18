// Coloque aqui suas actions
export const addEmail = (email) => ({ type: 'USER_ACTION', email });

export const addExpenses = (expense) => ({
  type: 'WALLET_EXPENSE',
  expense,
});
