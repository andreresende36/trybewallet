import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div className="wallet-form">
        <label
          htmlFor="value-input"
        >
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value-input"
            id="value-input"
            step=".01"
          />
        </label>
        <label
          htmlFor="description-input"
        >
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description-input"
            id="description-input"
          />
        </label>
        <label
          htmlFor="currency-input"
        >
          Moeda:
          <select data-testid="currency-input">
            {
              currencies
                ? currencies.map((item, i) => (<option key={ i }>{item}</option>))
                : null
            }
          </select>
        </label>
        <label htmlFor="method-input">
          Método de Pagamento:
          <select
            data-testid="method-input"
            id="method-input"
            name="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          <select
            data-testid="tag-input"
            id="tag-input"
            name="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
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
