import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitUserForm } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  checkButton = () => {
    const { email, password } = this.state;
    const six = 6;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validation1 = emailRegex.test(email);
    const validation2 = password.length >= six;
    this.setState({ disabled: !(validation1 && validation2) });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.checkButton);
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(submitUserForm(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disabled } = this.state;
    const { handleChange, handleClick } = this;
    return (
      <>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          placeholder="Digite aqui seu e-mail"
          onChange={ handleChange }
          value={ email }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="Senha com no mínimo 6 dígitos"
          onChange={ handleChange }
          value={ password }
        />
        <button
          type="button"
          disabled={ disabled }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
