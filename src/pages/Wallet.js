import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      dataCoins: [],
    };
    this.fecthDataCoins = this.fecthDataCoins.bind(this);
  }

  componentDidMount() {
    this.fecthDataCoins();
  }

  async fecthDataCoins() {
    const requisition = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await requisition.json();
    delete data.USDT;
    this.setState({
      dataCoins: data,
    });
  }

  tagSelectOptions() {
    return (
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
    );
  }

  render() {
    const { email } = this.props;
    const { dataCoins } = this.state;
    const dataCoinsVet = Object.keys(dataCoins);
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
            <select id="moeda">
              { dataCoinsVet.map((moeda, index) => (
                <option key={ index }>
                  {moeda === 'USDT' ? null : moeda }
                </option>
              )) }
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
          { this.tagSelectOptions() }
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
