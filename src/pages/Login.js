import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailText: '',
      password: 0,
    };
    this.inputHandle = this.inputHandle.bind(this);
    this.passwordHandle = this.passwordHandle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isEmail = this.isEmail.bind(this);
  }

  inputHandle(event) {
    this.setState({
      emailText: event.target.value,
    });
  }

  passwordHandle(event) {
    this.setState({
      password: event.target.value.length,
    });
  }

  handleClick() {
    const { emailText } = this.state;
    const { history, emailProp } = this.props;
    emailProp(emailText);
    history.push('/carteira');
  }

  // funcao vinda da fonte: https://stackoverflow.com/questions/41348459/regex-in-react-email-validation
  isEmail(val) {
    const regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!regEmail.test(val)) {
      return 'Invalid Email';
    }
  }

  render() {
    const { password, emailText } = this.state;
    const PASSWORD_LENTGH = 6;
    return (
      <main>
        <form>
          <label htmlFor="email-input">
            Email
            <input
              type="email"
              data-testid="email-input"
              onChange={ this.inputHandle }
              required
            />
          </label>

          <label htmlFor="password-input">
            Senha
            <input
              type="password"
              data-testid="password-input"
              minLength={ 6 }
              onChange={ this.passwordHandle }
            />
          </label>

          <button
            type="submit"
            id="submit-btn"
            onClick={ this.handleClick }
            disabled={ password < PASSWORD_LENTGH || this.isEmail(emailText) }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  emailProp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  emailProp: (email) => dispatch(addEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
