// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_CURRENCIES,
  SUBMIT_NEW_EXPENSE,
  DELETE_EXPENSE,
  SELECT_EXPENSE_TO_EDIT,
  FINISH_EDIT_EXPENSE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  total: 0,
  currency: 'BRL',
  currencies: [],
  expenses: [],
  idCount: 0,
  editingExpense: {},
  isEditing: false,
};

const updateChanges = (item, state, action) => {
  const array = ['value', 'description', 'currency', 'method', 'tag'];
  if (item.id === state.id) {
    array.forEach((key) => {
      item[key] = action.changes[key];
    });
    return item;
  }
  return item;
};

const getTotalValue = (state, changes) => {
  const { total, editingExpense } = state;
  const { value, exchangeRates, currency } = editingExpense;
  const oldValue = (Number(value) * Number(exchangeRates[currency].ask));
  const newValue = (Number(changes.value) * Number(exchangeRates[changes.currency].ask));
  return total - oldValue + newValue;
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SUBMIT_NEW_EXPENSE:
    return {
      ...state,
      idCount: state.idCount + 1,
      total: state.total + (Number(action.value) * action.ask),
      expenses: [...state.expenses, {
        id: state.idCount,
        value: action.value,
        description: action.description,
        currency: action.currency,
        method: action.method,
        tag: action.tag,
        exchangeRates: action.exchangeRates,
      }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== Number(action.id)),
      total: state.total - action.value,
    };
  case SELECT_EXPENSE_TO_EDIT:
    return {
      ...state,
      editingExpense: action.expense,
      isEditing: true,
    };
  case FINISH_EDIT_EXPENSE:
    return {
      ...state,
      editingExpense: {},
      isEditing: false,
      expenses:
        state.expenses.map((item) => updateChanges(item, state.editingExpense, action)),
      total: getTotalValue(state, action.changes),
    };

  default:
    return state;
  }
};

export default walletReducer;
