import React from 'react';
import ReactDOM from 'react-dom';
import IndexPage from './components/indexPage/IndexPage';
import Home from './components/home/Home';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <IndexPage url="indexPage" />
      </Route>
      <Route path="/login">
        <IndexPage url="login" />
      </Route>
      <Route path="/cadastro">
        <IndexPage url="cadastro" />
      </Route>
      <Route path="/sobre">
        <IndexPage url="sobre" />
      </Route>
      <Route path="/perfil">
        <Home type="perfil" />
      </Route>
      <Route path="/home">
        <Home type="home" />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
