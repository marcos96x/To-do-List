import React, { useState } from 'react';
import axios from "axios";
import { createBrowserHistory } from "history";

import url from "./../../../url/api";

import foto from '../../foto_cadastro.svg';

import './Cadastro.css';

function Cadastro() {

    const history = createBrowserHistory({
        basename: "/"
    })
    const redirect = history.push

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [styleMsg, setStyleMsg] = useState("");
    const [eye, setEye] = useState("visibility");
    const [typePassword, setTypePassword] = useState("password");
    const [termos, setTermos] = useState(false);

    function handleTermos(e) {
        setTermos(!termos);
    }

    function handleEye(e) {
        e.preventDefault();
        if (eye === "visibility") {
            setEye("visibility_off");
            setTypePassword("text");
        } else {
            setEye("visibility");
            setTypePassword("password")
        }
    }

    function handleName(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleEmail(e) {
        e.preventDefault();
        setEmail(e.target.value);
    }

    function handleLogin(e) {
        e.preventDefault();
        setLogin(e.target.value);
    }


    function handlePassword(e) {
        e.preventDefault();
        setPassword(e.target.value);
    }

    function tryRegister() {
        if (name.length === 0 || email.length === 0 || login.length === 0 || password.length === 0) {
            setMsg("Todos os campos devem ser preenchidos!");
            setStyleMsg("red white-text center-align");
        } else if (password.length < 6) {
            setMsg("A senha deve ter ao menos 6 digitos!");
            setStyleMsg("red white-text center-align");
        } else if(!termos) {
            setMsg("Para se registrar você deve concordar com nossos termos de uso!");
            setStyleMsg("red white-text center-align");
        } else {
            const data = {
                name_user: name,
                email_user: email,
                login_user: login,
                password_user: password
            }

            axios.post(`${url.url_api}/cadastro`, data)
                .then((res) => {
                    if (res) {
                        localStorage.setItem("id_user", res.data.user.id_user);
                        localStorage.setItem("email_user", res.data.user.email_user);
                        localStorage.setItem("name_user", res.data.user.name_user);
                        localStorage.setItem("login_user", res.data.user.login_user);
                        localStorage.setItem("token_user", res.data.token)
                        redirect("/home");
                        window.location.reload();
                    }
                })
                .catch((err) => {
                    if (err) {
                        setMsg("Este login ou este email já está sendo usado!");
                        setStyleMsg("yellow black-text center-align");
                    }
                })
        }
    }

    return (
        <div className="container Cadastro z-depth-2">
            <div className="row center-align title-cadastro">
                <br />
                <h4>Cadastro</h4>
            </div>
            <div className={ styleMsg }>
                { msg }
            </div>
            <div className="row">
                <div className="col s12 m6 l6">
                    <img alt="foto_cadastro" src={foto} className="foto_cadastro" />
                </div>
                <div className="col s12 m6 l6">
                    <div className="row">
                        <div className="input-field col s10">
                            <input id="name" type="text" className="validate" onChange={ handleName } />
                            <label htmlFor="name">Nome completo</label>
                        </div>
                        <div className="input-field col s10">
                            <input id="email" type="text" className="validate" onChange={ handleEmail } />
                            <label htmlFor="email">E-mail</label>
                        </div>
                        <div className="input-field col s10">
                            <input id="login" type="text" className="validate" onChange={ handleLogin } />
                            <label htmlFor="login">Login</label>
                        </div>
                        <div className="input-field col s10">
                            <input id="password" type={typePassword} className="validate" onChange={ handlePassword } />
                            <label htmlFor="password">Senha</label>
                        </div>
                        <div className="col s1">
                            <i className="material-icons eyeIcon" onClick={handleEye}> {eye} </i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <br />
                            <label>
                                <input type="checkbox" onClick={ handleTermos } />
                                <span>Concordo com os termos de uso</span>
                            </label>
                        </div>
                        <div className="col s6 center-align">
                            <button className="btn btn-cadastro2" onClick={ tryRegister }>Cadastrar</button>
                        </div>
                    </div>
                    <br />
                </div>

            </div>

        </div>
    );
}

module.exports = Cadastro;