import React from 'react';
import './LinksField.css';
import {
    Link
} from 'react-router-dom';

function LinksField(props) {
    if (props.location === "indexPage") {
        return (
            <div>
                <div className="links-field hide-on-small-only">
                    <Link to="/sobre">
                        <input type="button" className="btn-transparent" value="Sobre" />
                    </Link>
                    &nbsp; | &nbsp; &nbsp;

                    <a href="https://github.com" target="_blank"><input type="button" className="btn-transparent" value="Repositório" /></a>
                </div>
                <nav className="hide-on-med-and-up navMobile">
                    <div className="nav-wrapper">
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        
                            <div className="title-mobile left-align">
                                To-do list
                        
                        </div>
                        <ul className="right hide-on-med-and-down">
                        </ul>
                    </div>
                </nav>



                <ul className="sidenav" id="mobile-demo">
                    <li className="black-text">
                        <Link to="/sobre">
                            Sobre
                        </Link>
                    </li>
                    <li>
                        <a href="https://github.com" target="_blank">Repositório</a>
                    </li>
                </ul>
            </div>
        );
    } else {
        return (
            <div>
                <div className="links-field hide-on-small-only">
                    <Link to="/">
                        <input type="button" className="btn-transparent" value="Início" />
                    </Link>
                    |
                        <Link to="/sobre">
                        <input type="button" className="btn-transparent" value="Sobre" />
                    </Link>
                    &nbsp; | &nbsp; &nbsp;
                        <a href="https://github.com" target="_blank"><input type="button" className="btn-transparent" value="Repositório" /></a>
                </div>


                <nav className="hide-on-med-and-up black">
                    <div className="nav-wrapper">
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                        </ul>
                    </div>
                </nav>



                <ul className="sidenav" id="mobile-demo">
                    <li className="black-text">
                        <Link to="/">
                            Início
                        </Link>
                    </li>
                    <li  className="black-text">
                        <Link to="/sobre">
                            Sobre
                        </Link>
                    </li>
                    <li>
                        <a href="https://github.com" target="_blank">Repositório</a>
                    </li>
                </ul>
            </div>
        );
    }
}

module.exports = LinksField;