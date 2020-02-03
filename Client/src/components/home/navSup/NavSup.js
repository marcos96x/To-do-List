import React, { Component } from 'react';

import {
    Link
} from 'react-router-dom';


import { createBrowserHistory } from "history";

export default class NavSup extends Component {

    constructor(props) {
        super(props);

        const history = createBrowserHistory({
            basename: "/"
        })
        const redirect = history.push

        this.state = {
            logout: () => {
                localStorage.clear();
                redirect("/");
            }
        }
    }

    render() {
        if (this.props.pagina === "home")
            return (
                <div>
                    <nav>
                        <div className="nav-wrapper purple darken-1">
                            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                            <ul className="left hide-on-med-and-down">
                                <li><a href="#" onClick={this.state.logout}>Sair</a></li>
                                <li onClick={() => window.location.reload()}>
                                    <Link to="/perfil">
                                        Seu perfil
                                    </Link>
                                </li>
                                <li className="purple darken-3"><a href="#">Tarefas</a></li>
                            </ul>
                            <ul className="right">
                                Olá, {localStorage.getItem("name_user")}! &nbsp;&nbsp;&nbsp;
                        </ul>
                        </div>
                    </nav>
                    <ul className="sidenav" id="mobile-demo">
                        <li><a href="#">Tarefas</a></li>
                        <li onClick={() => window.location.reload()}><Link to="/perfil">
                            Perfil
                                    </Link></li>
                        <li><a href="#" onClick={this.state.logout}>Sair</a></li>
                    </ul>
                </div>
            );
        else if (this.props.pagina === "perfil")
            return (
                <div>
                    <nav>
                        <div className="nav-wrapper purple darken-1">
                            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                            <ul className="left hide-on-med-and-down">
                                <li><a href="#" onClick={this.state.logout}>Sair</a></li>
                                <li className="purple darken-3"><a href="#">Seu perfil</a></li>
                                <li onClick={() => window.location.reload()}>
                                    <Link to="/home">
                                        Tarefas
                                    </Link>
                                </li>
                            </ul>
                            <ul className="right">
                                Olá, {localStorage.getItem("name_user")}! &nbsp;&nbsp;&nbsp;
                        </ul>
                        </div>
                    </nav>
                    <ul className="sidenav" id="mobile-demo">
                        <li onClick={() => window.location.reload()}><Link to="/home">
                            Tarefas
                                    </Link></li>
                        <li><a href="#">Seu perfil</a></li>
                        <li><a href="#" onClick={this.state.logout}>Sair</a></li>
                    </ul>
                </div>
            );
    }
}

exports.module = NavSup;