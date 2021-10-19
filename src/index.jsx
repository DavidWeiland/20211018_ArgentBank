import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './utils/Style/main.css';
import App from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User'
import Header from './components/Header';
import Footer from './components/Footer';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/user">
          <User />
        </Route>
      </Switch>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
