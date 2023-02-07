// Coloque aqui suas actions
import { getCurrencies, getExchangeRates } from '../../services/api';
import {
  SUBMIT_USER_FORM,
  RECEIVE_CURRENCIES,
  SUBMIT_NEW_EXPENSE,
  DELETE_EXPENSE,
} from './actionTypes';

const submitUserForm = (email) => ({
  type: SUBMIT_USER_FORM,
  payload: email,
});

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  payload: currencies,
});

const submitNewExpense = (data, exchangeRates, ask) => ({
  type: SUBMIT_NEW_EXPENSE,
  value: data.value,
  description: data.description,
  currency: data.currency,
  method: data.method,
  tag: data.tag,
  exchangeRates,
  ask,
});

const deleteExpense = (id, value) => ({
  type: DELETE_EXPENSE,
  id,
  value,
});

const fetchCurrencies = () => async (dispatch) => {
  const currencies = await getCurrencies();
  dispatch(receiveCurrencies(currencies));
};

const fetchExpenses = (data) => async (dispatch) => {
  const exchangeRates = await getExchangeRates();
  const { ask } = exchangeRates[data.currency];
  dispatch(submitNewExpense(data, exchangeRates, ask));
};

export {
  submitUserForm,
  fetchCurrencies,
  fetchExpenses,
  submitNewExpense,
  deleteExpense,
};
