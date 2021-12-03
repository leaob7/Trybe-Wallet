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
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      isClicked: true,
    };
    this.fecthSelectCoins = this.fecthSelectCoins.bind(this);
    this.expensesCounter = this.expensesCounter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.tableMaker = this.tableMaker.bind(this);
    this.tableClick = this.tableClick.bind(this);
  }

  componentDidMount() {
    this.fecthSelectCoins();
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
    this.setState({ isClicked: true });
  }

  expensesCounter() {
    const { expenses } = this.props;
    if (expenses.length === 0) { return 0; }
    const sumExpenses = expenses.reduce((acc, { value, exchangeRates, currency }) => {
      if (currency === '') return 0;
      return (acc + Number(value) * exchangeRates[currency].ask);
    }, 0);
    return sumExpenses;
  }

  tableClick(e) {
    const { expenses } = this.props;
    if (expenses.length === 0) return null;
    const btnValue = e.target.value;
    expenses.splice(btnValue, 1);
    this.setState({ isClicked: false });
  }

  tableMaker() {
    const { expenses } = this.props;
    if (expenses.length === 0) return null;
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
        { expenses.map((expense, index) => (
          <tbody key={ index }>
            <tr>
              <td>{`${expense.value}`}</td>
              <td>{expense.description}</td>
              <td>{ toBefSubstring(expense.exchangeRates[expense.currency].name) }</td>
              <td>{expense.method}</td>
              <td>{expense.tag}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>{ (expense.value * expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
              {/* <td>{toAfterSubstring(expense.exchangeRates[expense.currency].name)}</td> */}
              <td>Real</td>
              {/* Real Brasileiro => Real */}
              <td>
                <button
                  value={ index }
                  type="button"
                  data-testid="delete-btn"
                  onClick={ this.tableClick }
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        )) }
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
          <h1>TrybeWallet</h1>
          <p data-testid="email-field">{`Email: ${email}`}</p>
          <p data-testid="total-field">{`Despesa total: R$${this.expensesCounter()}`}</p>
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
      </>);
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
