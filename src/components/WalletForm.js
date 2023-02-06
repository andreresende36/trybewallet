import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchExpenses } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchExpenses(this.state));
    this.setState({ value: '', description: '' });
  };

  render() {
    const { currencies } = this.props;
    const { handleChange, handleClick } = this;
    const { value, description } = this.state;
    return (
      <div className="wallet-form">
        <label
          htmlFor="value"
        >
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            id="value"
            step=".01"
            onChange={ handleChange }
            value={ value }
          />
        </label>
        <label
          htmlFor="description"
        >
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
            onChange={ handleChange }
            value={ description }
          />
        </label>
        <label
          htmlFor="currency"
        >
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            onChange={ handleChange }
          >
            {
              currencies
                ? currencies.map((item, i) => (<option key={ i }>{item}</option>))
                : null
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento:
          <select
            data-testid="method-input"
            id="method"
            name="method"
            onChange={ handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            onChange={ handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ handleClick }>Adicionar despesa</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
