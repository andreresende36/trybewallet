import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { isEditing, editingExpense } = this.props;
    const initialWalletForm = (<WalletForm
      value={ !isEditing ? '' : editingExpense.value }
      description={ !isEditing ? '' : editingExpense.description }
      currency={ !isEditing ? 'USD' : editingExpense.currency }
      method={ !isEditing ? 'Dinheiro' : editingExpense.method }
      tag={ !isEditing ? 'Alimentação' : editingExpense.tag }
    />);
    return (
      <div>
        <Header />
        { initialWalletForm }
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  isEditing: globalState.wallet.isEditing,
  editingExpense: globalState.wallet.editingExpense,
});

Wallet.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  editingExpense: PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Wallet);
