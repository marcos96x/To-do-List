import React from 'react';
import './bodyInfo.css';
import {
    Link
} from 'react-router-dom';

import foto1 from '../../foto1.svg';

function BodyInfo() {
    return (
        <div className="BodyInfo">
            <div className="hide-on-small-only">
                <div className="info-left">
                    <h3>Organize suas tarefas <br></br> de um jeito rápido e simples</h3>
                    <h6>
                        Com To-do list você poderá criar listas de tarefas em qualquer lugar de um jeito rápido e dinâmico. Crie uma conta e comece a organizar suas tarefas ou entre para gerenciar-las.
                    </h6>
                    <br />
                    <div className="buttons">
                        <Link to="/login">
                            <button className="btn btn-cadastro" id="btn-entrar" >Entrar</button>
                        </Link>
                        <Link to="/cadastro">
                            <button className="btn btn-cadastro">Cadastre-se</button>
                        </Link>
                    </div>

                </div>
                <div >
                    <img className="info-right" src={foto1} alt="to-do foto" />
                </div>
            </div>
            
            <div className="hide-on-med-and-up info">
                <div className="col s12">
                    <h5>Organize suas tarefas <br></br> de um jeito rápido e simples</h5>
                </div>
                <div className="col s12" >
                    <img className="info-right-mobile" src={foto1} alt="to-do foto" />
                </div>
                <div className="col s12">
                    <p>
                        Com To-do list você poderá criar listas de tarefas em qualquer lugar de um jeito rápido e dinâmico. Crie uma conta e comece a organizar suas tarefas ou entre para gerenciar-las.
                    </p>
                    <br />
                    <div className="row">
                        <div className="col s6">
                            <Link to="/login">
                                <button className="btn-mobile btn-cadastro-mobile" id="btn-entrar" >Entrar</button>
                            </Link>
                        </div>
                        <div className="col s6">
                            <Link to="/cadastro">
                                <button className="btn-mobile btn-cadastro-mobile">Cadastro</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

module.exports = BodyInfo;