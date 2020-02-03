import React, { Component } from 'react';

import axios from 'axios';
import url from './../../../url/api';

import './Perfil.css';

import foto from './../../avatar.svg';

export default class Perfil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: localStorage.getItem("name_user"),
            email: localStorage.getItem("email_user"),
            login: localStorage.getItem("login_user"),
            novo_nome: "",
            novo_login: "",
            novo_email: "",
            nova_senha: "",
            nova_senha2: "",
            aviso: "",
            classeAviso: "",

            trocaEmail: () => {
                if (this.state.novo_email.trim().length === 0)
                    this.setState({
                        aviso: "Campo de email vazio!",
                        classeAviso: "red white-text"
                    })
                else {
                    const dados = {
                        user: {
                            email_user: this.state.novo_email
                        },
                        token: localStorage.getItem("token_user")
                    }

                    axios.put(`${url.url_api}/users/${localStorage.getItem("id_user")}`, dados)
                        .then((res) => {
                            if (res) {
                                this.setState({
                                    aviso: "Email alterado com sucesso",
                                    classeAviso: "green white-text",
                                    email: this.state.novo_email
                                })
                                localStorage.setItem("email_user", this.state.email)
                            }
                        })
                        .catch((err) => {
                            if (err) console.log(err)
                        })
                }
            },
            trocaLogin: () => {
                if (this.state.novo_login.trim().length === 0)
                    this.setState({
                        aviso: "Campo de login vazio!",
                        classeAviso: "red white-text"
                    })
                else {
                    const dados = {
                        user: {
                            login_user: this.state.novo_login
                        },
                        token: localStorage.getItem("token_user")
                    }

                    axios.put(`${url.url_api}/users/${localStorage.getItem("id_user")}`, dados)
                        .then((res) => {
                            if (res) {
                                this.setState({
                                    aviso: "Login alterado com sucesso",
                                    classeAviso: "green white-text",
                                    login: this.state.novo_login
                                })
                                localStorage.setItem("login_user", this.state.login)
                            }
                        })
                        .catch((err) => {
                            if (err) console.log(err)
                        })

                }
            },
            trocaNome: () => {
                if (this.state.novo_nome.trim().length === 0)
                    this.setState({
                        aviso: "Campo de nome vazio!",
                        classeAviso: "red white-text"
                    })
                else {
                    const dados = {
                        user: {
                            name_user: this.state.novo_nome
                        },
                        token: localStorage.getItem("token_user")
                    }

                    axios.put(`${url.url_api}/users/${localStorage.getItem("id_user")}`, dados)
                        .then((res) => {
                            if (res) {
                                this.setState({
                                    aviso: "Nome alterado com sucesso",
                                    classeAviso: "green white-text",
                                    nome: this.state.novo_nome
                                })
                                localStorage.setItem("name_user", this.state.nome)

                            }
                        })
                        .catch((err) => {
                            if (err) console.log(err)
                        })
                }
            },
            trocaSenha: () => {
                if(this.state.nova_senha !== this.state.nova_senha2)
                    this.setState({
                        aviso: "As senhas não são iguais!",
                        classeAviso: "red white-text"
                    })
                else if (this.state.nova_senha.trim().length === 0)
                    this.setState({
                        aviso: "Campos de senha vazios!",
                        classeAviso: "red white-text"
                    })
                else if(this.state.nova_senha.trim().length < 6)
                    this.setState({
                        aviso: "A senha deve ter ao menos 6 digitos!",
                        classeAviso: "red white-text"
                    })
                else {
                    const dados = {
                        user: {
                            password_user: this.state.nova_senha
                        },
                        token: localStorage.getItem("token_user")
                    }

                    axios.put(`${url.url_api}/users/${localStorage.getItem("id_user")}`, dados)
                        .then((res) => {
                            if (res) {
                                this.setState({
                                    aviso: "Senha alterada com sucesso",
                                    classeAviso: "green white-text"
                                })
                            }
                        })
                        .catch((err) => {
                            if (err) console.log(err)
                        })
                }
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="container">
                        <div className="row campo-perfil center-align hide-on-small-only">
                            <div className={this.state.classeAviso}>{this.state.aviso}</div>
                            <div className="col s6 foto">
                                <img src={foto} alt="Foto de login" />
                            </div>
                            <div className="col s6 white-text informacoes">
                                <h4>Dados pessoais</h4>
                                Nome: <label className="label">{this.state.nome}</label> <br />

                                Login: <label className="label">{this.state.login}</label> <br />

                                Email: <label className="label">{this.state.email}</label> <br /> <br />


                                <div className="fixed-action-btn toolbar">
                                    <a className="btn-floating btn-large purple darken-1">
                                        <i className="large material-icons">mode_edit</i>
                                    </a>
                                    <ul>
                                        <li><a className="modal-trigger" href="#modalNome">Nome</a></li>
                                        <li><a className="modal-trigger" href="#modalLogin">Login</a></li>
                                        <li><a className="modal-trigger" href="#modalEmail">Email</a></li>
                                        <li><a className="modal-trigger" href="#modalSenha">Senha</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div className="row campo-perfil center-align hide-on-med-and-up">
                            <div className={this.state.classeAviso}>{this.state.aviso}</div>
                            <div className="col s12 foto">
                                <img src={foto} alt="Foto de login" />
                            </div>
                            <div className="col s12 white-text informacoes">
                                <h4>Dados pessoais</h4>
                                Nome: <label className="label">{this.state.nome}</label> <br />

                                Login: <label className="label">{this.state.login}</label> <br />

                                Email: <label className="label">{this.state.email}</label> <br /> <br />


                                <div className="fixed-action-btn toolbar">
                                    <a className="btn-floating btn-large purple darken-1">
                                        <i className="large material-icons">mode_edit</i>
                                    </a>
                                    <ul>
                                        <li><a className="modal-trigger" href="#modalNome">Nome</a></li>
                                        <li><a className="modal-trigger" href="#modalLogin">Login</a></li>
                                        <li><a className="modal-trigger" href="#modalEmail">Email</a></li>
                                        <li><a className="modal-trigger" href="#modalSenha">Senha</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div id="modalNome" className="modal">
                    <div className="modal-content">
                        <h4>Alterar nome</h4>
                        <div className="input-field col s12">
                            <input id="nome" type="text" className="validate" onChange={(e) => { e.preventDefault(); this.setState({ novo_nome: e.target.value }) }} />
                            <label htmlFor="nome">Novo nome</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat purple black-text" onClick={this.state.trocaNome}><i className="material-icons">done</i></a>
                    </div>
                </div>

                <div id="modalLogin" className="modal">
                    <div className="modal-content">
                        <h4>Alterar Login</h4>
                        <div className="input-field col s12">
                            <input id="login" type="text" className="validate" onChange={(e) => { e.preventDefault; this.setState({ novo_login: e.target.value }) }} />
                            <label htmlFor="login">Novo login</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat purple black-text" onClick={this.state.trocaLogin}><i className="material-icons">done</i></a>
                    </div>
                </div>

                <div id="modalEmail" className="modal">
                    <div className="modal-content">
                        <h4>Alterar Email</h4>
                        <div className="input-field col s12">
                            <input id="email" type="text" className="validate" onChange={(e) => { e.preventDefault; this.setState({ novo_email: e.target.value }) }} />
                            <label htmlFor="email">Novo email</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat purple black-text" onClick={this.state.trocaEmail}><i className="material-icons">done</i></a>
                    </div>
                </div>

                <div id="modalSenha" className="modal">
                    <div className="modal-content">
                        <h4>Alterar Senha</h4>
                        <div className="input-field col s12">
                            <input id="senha" type="text" className="validate" onChange={(e) => { e.preventDefault; this.setState({ nova_senha: e.target.value }) }} />
                            <label htmlFor="senha">Nova senha</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="senha2" type="text" className="validate" onChange={(e) => { e.preventDefault; this.setState({ nova_senha2: e.target.value }) }} />
                            <label htmlFor="senha2">Confirme sua senha</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat purple black-text" onClick={this.state.trocaSenha}><i className="material-icons">done</i></a>
                    </div>
                </div>

            </div>
        );
    }


}