import React, { useState } from 'react';
import { createBrowserHistory } from "history";

import axios from "axios";


import './Login.css';
import foto from '../../foto_login.svg';

function Login() {


    const history = createBrowserHistory({
        basename: "/"
    })
    const redirect = history.push

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [styleMsg, setStyleMsg] = useState("");
    const [typePassword, setTypePassword] = useState("password");

    const [eye, setEye] = useState("visibility");

    function handleEye(e){
        e.preventDefault();
        if(eye === "visibility"){
            setEye("visibility_off");
            setTypePassword("text");
        } else{
            setEye("visibility");
            setTypePassword("password")
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        setLogin(e.target.value)
    }
    function handlePassword(e) {
        e.preventDefault();
        setPassword(e.target.value);
    }

    function tryLogin(e) {
        e.preventDefault();

        if (login.length === 0 || password.length === 0) {
            setMsg("Os campos devem ser preenchidos");
            setStyleMsg("red white-text center-align");
        } else {
            setMsg("");
            setStyleMsg("");
            let dados = {
                login: login,
                password: password
            }
            axios.post("http://localhost:3001/login", dados)
                .then((res) => {
                    localStorage.setItem("id_user", res.data.user.id_user);
                    localStorage.setItem("email_user", res.data.user.email_user);
                    localStorage.setItem("name_user", res.data.user.name_user);
                    localStorage.setItem("login_user", res.data.user.login_user);
                    localStorage.setItem("token_user", res.data.token)
                    redirect("/home");
                    window.location.reload();
                })
                .catch((err) => {
                    if (err) {
                        setMsg("Login ou senha inválidos");
                        setStyleMsg("yellow black-text center-align");

                    }
                })
        }
    }

    return (
        <div className="container Login z-depth-2">
            <div className="row center-align title-login">
                <br />
                <h4>Login</h4>
            </div>
            <div className={ styleMsg }>
                { msg }
            </div>
            <div className="row">
                <div className="col s12 m6 l6">
                    <img src={foto} alt="foto_login" className="foto-login" />
                </div>
                <div className="col s12 m6 l6">
                    <div className="row">
                        <div className="input-field col s10">
                            <input id="name" type="text" className="validate" onChange={ handleLogin } />
                            <label htmlFor="name">Login</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s10 input-field">
                            <input id="password" type={typePassword} className="validate" onChange={ handlePassword } />
                            <label htmlFor="password">Senha</label>
                        </div>
                        <div className="col s1">
                            <i className="material-icons eyeIcon" onClick={ handleEye }> {eye} </i>
                        </div>
                    </div>
                    <div className="row hide-on-med-and-up">
                        <br />
                        <div className="center-align">
                            <button className="btn btn-login" onClick={ tryLogin }>Entrar</button>
                        </div>
                    </div>
                    <div className="row hide-on-small-only">
                        <br />
                        <div className="center-align">
                            <button className="btn btn-login-desk" onClick={ tryLogin }>Entrar</button>
                        </div>
                    </div>
                    <br />
                </div>
            </div>

        </div>
    );
}

module.exports = Login;