import React from 'react';
import './NavBar.css';
import logo from './logo.png'

import LinksField from './linksField/LinksField';

function NavBar(props) {
    return (
        <div className="NavBar">
            <div className="hide-on-small-only">
                <div className="icon">
                    <img src={logo} className="logo-sistema" alt="Logo sistema" />
                </div>
                <div className="title">
                    To-do list
                </div>
            </div>
            <LinksField location={props.location} />
        </div>
    );
}

module.exports = NavBar;