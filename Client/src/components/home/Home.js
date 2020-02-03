import React from 'react';

import './Home.css';

import NavSup from "./navSup/NavSup";
import Tasks from './tasks/Tasks';
import Perfil from './perfil/Perfil';
function Home(props) {

    if(props.type === "home")
        return (
            <div>
                <NavSup pagina="home" />
                <Tasks />
            </div>
        );
    else if (props.type === "perfil")
        return (
            <div>
                <NavSup pagina="perfil" />
                <Perfil />
            </div>
        );
}

module.exports = Home;