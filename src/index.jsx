import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './utils/Style/main.css';
import App from './pages/Home';
import Login from './pages/Login/index';
import Profile from './pages/Profile'
import Header from './components/Header';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import { store } from './utils/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
