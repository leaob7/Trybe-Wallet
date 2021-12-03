import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toAfterSubstring, toBefSubstring } from '../utils/htFunctions';
import { fetchExchange as fetchExchangeAction } from '../actions';
import '../styles/wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      dataCoins: [],
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.fecthSelectCoins = this.fecthSelectCoins.bind(this);
    this.expensesCounter = this.expensesCounter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.tableMaker = this.tableMaker.bind(this);
  }

  componentDidMount() {
    this.fecthSelectCoins();
    // bodyMaker();
  }

  async fecthSelectCoins() {
    const requisition = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await requisition.json();
    delete data.USDT;
    this.setState({
      dataCoins: data,
    });
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    this.setState({
      [name]: event.target.value,
    });
  }

  tagSelectOptions() {
    return (
      <label htmlFor="tag">
        Tag
        <select id="tag" name="tag" onChange={ this.handleChange }>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  async handleSubmit() {
    const { fetchExchange } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expen = {
      value,
      description,
      currency,
      method,
      tag,
    };
    fetchExchange(expen);
  }

  expensesCounter() {
    const { expenses } = this.props;
    if (expenses.length === 0) { return 0; }
    const sumExpenses = expenses.reduce((acc, { value, exchangeRates, currency }) => {
      if (currency === '') return 0;
      return (acc + value * exchangeRates[currency].ask);
    }, 0);
    return sumExpenses;
  }

  tableMaker() {
    const { expenses } = this.props;
    if (expenses.length === 0) return null;
    const last = expenses[expenses.length - 1];
    console.log(last);
    return (
      <table>
        <thead id="costumer-div">
          <tr id="ttr">
            <th>Valor</th>
            <th>Descrição</th>
            <th>Moeda</th>
            <th>Método de pagamento</th>
            <th>Tag</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          <td>{`${last.currency} ${last.value}`}</td>
          <td>{last.description}</td>
          <td>{ toBefSubstring(last.exchangeRates[last.currency].name) }</td>
          <td>{last.method}</td>
          <td>{last.tag}</td>
          <td>{last.currency}</td>
          <td>{ this.expensesCounter().toFixed(2) }</td>
          <td>{ toAfterSubstring(last.exchangeRates[last.currency].name) }</td>
          <button type="button" data-testid="delete-btn">Excluir/Editar</button>
        </tbody>
      </table>
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
          <p data-testid="total-field">{this.expensesCounter()}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form className="form-wallet">
          <label htmlFor="value">
            Valor
            <input type="text" id="value" name="value" onChange={ this.handleChange } />
          </label>
          <label htmlFor="descricao">
            Descrição
            <input
              type="text"
              id="descricao"
              name="description"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select id="moeda" name="currency" onChange={ this.handleChange }>
              { dataCoinsVet.map((moeda, index) => (
                <option key={ index }>
                  {moeda}
                </option>
              )) }
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento
            <select id="pagamento" name="method" onChange={ this.handleChange }>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          { this.tagSelectOptions() }
          <button type="button" onClick={ this.handleSubmit }>Adicionar despesa</button>
        </form>
        { this.tableMaker() }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchExchange: (expense) => dispatch(fetchExchangeAction(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetchExchange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
