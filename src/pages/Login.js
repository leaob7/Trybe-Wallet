import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <main>
        <label htmlFor="email-input">
          Email
          <input type="email" data-testid="email-input" />
        </label>

        <label htmlFor="password-input">
          Senha
          <input type="password" data-testid="password-input" />
        </label>

        <button type="submit" id="submit-btn">Entrar</button>
      </main>
    );
  }
}

export default Login;
