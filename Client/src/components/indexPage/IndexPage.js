import React from 'react';
import './IndexPage.css';

import NavBar from './navbar/NavBar';
import BodyInfo from './bodyInfo/BodyInfo';
import Login from './login/Login';
import Cadastro from './cadastro/Cadastro';
import Sobre from './bodyInfo/sobre/Sobre';

function IndexPage(props) {
  if (props.url === "indexPage") {
    return (
      <div className="IndexPage">
        <NavBar location="indexPage" />
        <BodyInfo />
      </div>
    );
  } else if (props.url === "login") {
    return (
      <div className="IndexPage">
        <NavBar location="login" />
        <Login />
      </div>
    );
  } else if (props.url === "cadastro") {
    return (
      <div className="IndexPage">
        <NavBar location="cadastro" />
        <Cadastro />
      </div>
    );
  } else if (props.url === "sobre") {
    return (
      <div className="IndexPage">
        <NavBar location="sobre" />
        <Sobre />
      </div>
    );
  }
}

module.exports = IndexPage;
