import React from 'react';
import './Sobre.css';

function Sobre() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col s12 Sobre">
                        <h4>
                            Ideia principal
                        </h4>
                        <p>
                            A principal ideia deste projeto é fazer com que a organização das tarefas realizadas no dia a dia seja feita de uma maneira dinâmica e rápida
                        </p>

                        <h4>
                            Desenvolvimento
                        </h4>
                        <p>
                            A execução deste projeto durou uma semana. A intenção secundária era de botar em prática os conhecimentos que eu adquiri em React JS, aplicando em um projeto que teria alguma utilização.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

module.exports = Sobre;