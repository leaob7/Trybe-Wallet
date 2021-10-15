import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';

function App() {
  // return <div>Hello, TrybeWallet!</div>;
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </main>
  );
}

export default App;
