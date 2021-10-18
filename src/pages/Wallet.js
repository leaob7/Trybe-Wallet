import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{0}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="value">
            Valor
            <input type="text" id="value" />
          </label>
          <label htmlFor="descricao">
            Descrição
            <input type="text" id="descricao" />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select id="moeda" >

            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento
            <select id="pagamento">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
// export default Wallet;
