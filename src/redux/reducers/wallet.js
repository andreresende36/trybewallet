// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_CURRENCIES,
  SUBMIT_NEW_EXPENSE,
  DELETE_EXPENSE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  total: 0,
  currency: 'BRL',
  currencies: [],
  expenses: [],
  idCount: 0,
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
  default:
    return state;
  }
};

export default walletReducer;
