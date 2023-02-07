import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  handleDeleteButton = ({ target: { id, value } }) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id, value));
  };

  fillExpensesTable = () => {
    const { expenses } = this.props;
    return expenses.map((item) => (
      <tr key={ item.id }>
        <td>{item.description}</td>
        <td>{item.tag}</td>
        <td>{item.method}</td>
        <td>{parseFloat(item.value).toFixed(2)}</td>
        <td>{item.exchangeRates[item.currency].name}</td>
        <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
        <td>
          {
            parseFloat(
              item.value * item.exchangeRates[item.currency].ask,
            ).toFixed(2)
          }
        </td>
        <td>Real</td>
        <td>
          <button type="button" data-testid="edit-btn">Editar</button>
          <button
            type="button"
            data-testid="delete-btn"
            id={ item.id }
            value={ parseFloat(
              item.value * item.exchangeRates[item.currency].ask,
            ).toFixed(2) }
            onClick={ this.handleDeleteButton }
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          { this.fillExpensesTable() }
        </tbody>

      </table>
    );
  }
}
const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
