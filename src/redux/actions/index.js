// Coloque aqui suas actions
import getCurrencies from '../../services/api';
import {
  SUBMIT_USER_FORM,
  RECEIVE_CURRENCIES,
} from './actionTypes';

const submitUserForm = (email) => ({
  type: SUBMIT_USER_FORM,
  payload: email,
});

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  payload: currencies,
});

const fetchCurrencies = () => async (dispatch) => {
  const currencies = await getCurrencies();
  dispatch(receiveCurrencies(currencies));
};

export {
  submitUserForm,
  fetchCurrencies,
};
