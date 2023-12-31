// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SUBMIT_USER_FORM } from '../actions/actionTypes';

const INITIAL_STATE = { email: '' };

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_USER_FORM:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
