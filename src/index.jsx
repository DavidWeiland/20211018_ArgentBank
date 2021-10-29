import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './utils/Style/main.css';
import App from './pages/Home';
import Login from './pages/Login/index';
import ModifyUser from './pages/ModifyUser'
import CreateUser from './pages/CreateUser'
import User from './pages/User'
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
          <Route path="/newUser">
            <CreateUser />
          </Route>
          <Route path="/profile">
            <ModifyUser />
          </Route>
          <Route path="/user">
            <User />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
