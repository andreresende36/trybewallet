// Coloque aqui suas actions
import { SAVE_USER } from './actionTypes';

const saveUser = (email) => ({
  type: SAVE_USER,
  payload: email,
});

export { saveUser, SAVE_USER };
