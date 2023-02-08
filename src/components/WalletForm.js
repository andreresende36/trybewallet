import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencies,
  fetchExpenses,
  finishEditExpense,
} from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  };

  async componentDidMount() {
    const { dispatch, value, description, currency, method, tag } = this.props;
    dispatch(fetchCurrencies());
    this.setState({ value, description, currency, method, tag });
  }

  componentDidUpdate(prevProps) {
    const array = ['value', 'description', 'currency', 'method', 'tag'];
    const { props } = this;
    array.forEach((item) => {
      if (props[item] !== prevProps[item]) {
        this.setState({ [item]: props[item] });
      }
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleAddClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchExpenses(this.state));
    this.setState({ value: '', description: '' });
  };

  handleEditClick = () => {
    const { dispatch } = this.props;
    dispatch(finishEditExpense(this.state));
  };

  render() {
    const { currencies, isEditing } = this.props;
    const { handleChange, handleAddClick, handleEditClick } = this;
    const { value, description, currency, method, tag } = this.state;
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
            value={ currency }
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
            value={ method }
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
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        {!isEditing
          ? (<button type="button" onClick={ handleAddClick }>Adicionar despesa</button>)
          : (<button type="button" onClick={ handleEditClick }>Editar despesa</button>) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editingExpense: state.wallet.editingExpense,
  isEditing: state.wallet.isEditing,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editingExpense: PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
