import React, { Component } from 'react';
import axios from 'axios';

import url from '../../../url/api';

import './Tasks.css';


export default class Tasks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tarefas: [],
            title: ["Tarefas pendentes", "Tarefas concluídas", "Todas as tarefas"],
            descricao: "",
            id_descricao: null,
            view_descricao: true,
            tipo_visualizacao: 2,
            newTaskTitle: "",
            newTaskDesc: "",
            classAviso: "",
            aviso: "",
            classButton: "fixed-action-btn",
            setDescricao: (desc, id_desc) => {
                this.setState({
                    descricao: desc,
                    id_descricao: id_desc,
                    view_descricao: false
                });
            },
            setTarefa: (tar) => {
                this.setState({
                    tarefas: tar
                })
            },
            setTipoVisualizacao: (tipo) => {
                this.setState({ tipo_visualizacao: tipo, descricao: "", view_descricao: true });
                this.setState({
                    classAviso: "",
                    aviso: ""
                })
            },
            add: () => {
                if (this.state.newTaskDesc.trim().length === 0 || this.state.newTaskTitle.trim().length === 0)
                    this.setState({
                        classAviso: "red white-text center-align",
                        aviso: "Campos obrigatórios inválidos!"
                    })
                else {
                    const dados = {
                        task: {
                            name_task: this.state.newTaskTitle,
                            description_task: this.state.newTaskDesc,
                            finished_task: false,
                            id_user: localStorage.getItem("id_user")
                        },
                        user: {
                            id_user: localStorage.getItem("id_user")
                        },
                        token: localStorage.getItem("token_user")
                    }

                    axios.post(`${url.url_api}/tasks/0`, dados)
                        .then((res) => {
                            if (res.status === 200) {
                                console.log(res)

                                const data = {
                                    user: {
                                        id_user: localStorage.getItem("id_user")
                                    },
                                    token: localStorage.getItem("token_user")
                                };

                                axios.post(`${url.url_api}/tasks/show`, data)
                                    .then((res) => {
                                        if (res.data.tasks) {
                                            this.state.setTarefa(
                                                res.data.tasks
                                            )
                                            this.setState({
                                                classAviso: "green white-text center-align",
                                                aviso: "Tarefa adicionada com sucesso!"
                                            })
                                        } else {
                                            this.state.setTarefa(
                                                []
                                            )

                                            console.log("erro 1")
                                        }
                                    })
                                    .catch((err) => {
                                        if (err) {
                                            this.state.setTarefa(
                                                []
                                            )
                                            console.log("erro 2")
                                        }
                                    });

                            }
                        })
                        .catch((err) => {
                            if (err)
                                console.log(err)
                        })
                }
            },
            done: () => {
                const data = {
                    task: {
                        finished_task: true
                    },
                    user: {
                        id_user: localStorage.getItem("id_user")
                    },
                    token: localStorage.getItem("token_user")
                }


                axios.put(`${url.url_api}/tasks/${this.state.id_descricao}`, data)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log(res)


                            axios.post(`${url.url_api}/tasks/show`, data)
                                .then((res) => {
                                    if (res.data.tasks) {
                                        this.state.setTarefa(
                                            res.data.tasks
                                        )
                                        this.setState({
                                            classAviso: "green white-text center-align",
                                            aviso: "Tarefa concluída com sucesso!", 
                                            descricao: "",
                                            view_descricao: true 
                                        })
                                    } else {
                                        this.state.setTarefa(
                                            []
                                        )

                                        console.log("erro 1")
                                    }
                                })
                                .catch((err) => {
                                    if (err) {
                                        this.state.setTarefa(
                                            []
                                        )
                                        console.log("erro 2")
                                    }
                                });

                        }
                    })
                    .catch((err) => {
                        if (err)
                            console.log(err)
                    })

            },
            delete: () => {
                const data = {
                    task: {
                        finished_task: true
                    },
                    user: {
                        id_user: localStorage.getItem("id_user")
                    },
                    token: localStorage.getItem("token_user")
                }


                axios.delete(`${url.url_api}/tasks/${this.state.id_descricao}`, {data: data})
                    .then((res) => {
                        if (res.status === 200) {
                            console.log(res)


                            axios.post(`${url.url_api}/tasks/show`, data)
                                .then((res) => {
                                    if (res.data.tasks) {
                                        this.state.setTarefa(
                                            res.data.tasks
                                        )
                                        this.setState({
                                            classAviso: "green white-text center-align",
                                            aviso: "Tarefa excluída com sucesso!", 
                                            descricao: "",
                                            view_descricao: true 
                                        })
                                    } else {
                                        this.state.setTarefa(
                                            []
                                        )

                                        console.log("erro 1")
                                    }
                                })
                                .catch((err) => {
                                    if (err) {
                                        this.state.setTarefa(
                                            []
                                        )
                                        console.log("erro 2")
                                    }
                                });

                        }
                    })
                    .catch((err) => {
                        if (err)
                            console.log(err)
                    })
            }

        }
    }

    componentDidMount() {
        const data = {
            user: {
                id_user: localStorage.getItem("id_user")
            },
            token: localStorage.getItem("token_user")
        };

        axios.post(`${url.url_api}/tasks/show`, data)
            .then((res) => {
                if (res.data.tasks) {
                    this.state.setTarefa(
                        res.data.tasks
                    )
                } else {
                    this.state.setTarefa(
                        []
                    )

                    console.log("erro 1")
                }
            })
            .catch((err) => {
                if (err) {
                    this.state.setTarefa(
                        []
                    )
                    console.log("erro 2")
                }
            });
    }

    render() {
        return (
            <div className="container ">
                <div className="row center-align">
                    <br />
                    <button className="waves-effect waves-purple btn-small purple darken-1 white-text" onClick={() => this.state.setTipoVisualizacao(2)} >Todas</button> &nbsp;
                        <button className="waves-effect waves-purple btn-small purple darken-1 white-text" onClick={() => this.state.setTipoVisualizacao(1)}>Concluídas</button> &nbsp;
                        <button className="waves-effect waves-purple btn-small purple darken-1 white-text" onClick={() => this.state.setTipoVisualizacao(0)}>Pendentes</button>
                </div>
                <div className={this.state.classAviso}>
                    {this.state.aviso}
                </div>
                <div className="row campo-tarefas center-align">
                    <div className="col s6 tarefas">
                        <h5 className="white-text">{this.state.title[this.state.tipo_visualizacao]}</h5>
                        {
                            this.state.tarefas.map((dados) => {
                                if (this.state.tipo_visualizacao === 2) {
                                    return <div key={dados.id_task} className="task" onClick={() => this.state.setDescricao(dados.description_task, dados.id_task)} >{dados.name_task}</div>
                                } else if (dados.finished_task === this.state.tipo_visualizacao) {
                                    return <div key={dados.id_task} className="task" onClick={() => this.state.setDescricao(dados.description_task, dados.id_task)}>{dados.name_task}</div>
                                }
                            })
                        }

                        <br />
                    </div>
                    <div className="col s6 descricao">
                        <h5 className="white-text">Descrição</h5>

                        <div className="descricao-content">
                            {this.state.descricao}
                        </div>

                        <br />
                        <div className="descricao-action" hidden={this.state.view_descricao}>
                            <a className="btn-small green black-text modal-trigger" href="#modalConclui"><i className="material-icons">done</i></a>
                            &nbsp; &nbsp;
                                <a className="btn-small red black-text modal-trigger" href="#modalDeleta"><i className="material-icons">delete</i></a>
                        </div>

                        <br />
                    </div>
                </div>

                <div className={this.state.classButton}>
                    <a className="btn-floating btn-large purple darken-3 black-text modal-trigger" href="#modalAdd">
                        <i className="large material-icons">add</i>
                    </a>
                </div>

                <div id="modalAdd" className="modal">
                    <div className="modal-content">
                        <h4>Adicionar tarefa</h4>
                        <div className="input-field col s12">
                            <input id="name_tarefa" type="text" className="validate" onChange={(e) => { e.preventDefault; this.setState({ newTaskTitle: e.target.value }) }} />
                            <label htmlFor="name_tarefa">Título</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="desc_tarefa" type="text" className="validate" onChange={(e) => { e.preventDefault; this.setState({ newTaskDesc: e.target.value }) }} />
                            <label htmlFor="desc_tarefa">Descrição</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat purple black-text" onClick={this.state.add}><i className="material-icons">add</i></a>
                    </div>
                </div>

                <div id="modalConclui" className="modal">
                    <div className="modal-content">
                        <h4>Concluir tarefa</h4>
                        <p>Tem certeza que deseja concluir esta tarefa?</p>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat green black-text" onClick={this.state.done}><i className="material-icons">done</i></a>
                    </div>
                </div>

                <div id="modalDeleta" className="modal">
                    <div className="modal-content">
                        <h4>Deletar tarefa</h4>
                        <p>Tem certeza que deseja deletar esta tarefa? esta ação não poderá ser desfeita.</p>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat red black-text" onClick={this.state.delete}><i className="material-icons">delete</i></a>
                    </div>
                </div>
            </div>
        );


    }

}