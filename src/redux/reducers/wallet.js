// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_CURRENCIES,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  total: 0,
  currency: 'BRL',
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      isLoading: false,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
