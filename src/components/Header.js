import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total, currency } = this.props;
    return (
      <div className="header-container">
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3814/3814848.png"
            alt="Ícone de uma carteira"
            className="wallet-image"
          />
        </div>
        <div className="header-info">
          <span data-testid="email-field">
            {`Email: ${email}`}
          </span>
          <div>
            <span>Despesa Total: R$ </span>
            <span data-testid="total-field">
              {`${parseFloat(total).toFixed(2)}`}
            </span>
            <span data-testid="header-currency-field">
              {` ${currency}`}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
  currency: state.wallet.currency,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
