const database = require("../models/db")();
const jwt = require("jsonwebtoken");
const authConfig = require("./../../libs/auth");

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

const taskHandler = {

    auth: async (req, res, next) => {
        const authToken = req.body.token;

        if (!authToken) {
            res.status(401).send({ err: "No token provided" });
            return false;
        } else {
            const parts = authToken.split(" ");

            if (!parts.length === 2) {
                res.status(401).send({ err: "Token error" });
                return false;
            } else {
                const [scheme, token] = parts;

                if (!/^Bearer$/i.test(scheme)) {
                    res.status(401).send({ err: "Token Malformatted" });
                    return false;
                } else {
                    await jwt.verify(token, authConfig.secret, (err, decoded) => {
                        if (err) {
                            res.status(401).send({ err: "Token invalid" });
                            return false;
                        } else {
                            if (decoded.id == req.body.user.id_user || decoded.id == req.params.id) {
                                next();
                            } else {
                                return res.status(401).send({ err: "Adultered Token" });
                            }
                        }
                    })
                }
            }
        }
    },
    showAll: async (req, res) => {
        await database.query("SELECT * FROM tb_task WHERE id_user = ?", [req.body.user.id_user], (errors, rows) => {
            if (!errors && rows.length > 0) {
                let row = rows.reverse();
                let newToken = "Bearer " + generateToken({ id: req.body.user.id_user });
                res.status(200).send({ tasks: row, token: newToken });
            } else {
                let newToken = "Bearer " + generateToken({ id: req.body.user.id_user });
                res.status(203).send({ err: "Tasks not found", token: newToken });
            }
        });

    },
    showOne: async (req, res) => {
        await database.query("SELECT * FROM tb_task WHERE id_task = ? AND id_user = ? ", [req.params.id, req.body.user.id_user], (errors, rows) => {
            if (!errors && rows.length > 0) {
                let row = rows[0];
                let newToken = "Bearer " + generateToken({ id: req.body.user.id_user });
                res.status(200).send({ tasks: row, token: newToken });
            } else if (rows.length == 0) {
                let newToken = "Bearer " + generateToken({ id: req.body.user.id_user });
                res.status(200).send({ err: "Task not found", token: newToken });
            } else {
                let newToken = "Bearer " + generateToken({ id: req.body.user.id_user });
                res.status(404).send({ err: "Task not found", token: newToken });
            }
        });
    },
    add: async (req, res) => {
        await database.query("INSERT INTO tb_task SET ?", req.body.task, (errors) => {
            if (!errors) {
                let newToken = "Bearer " + generateToken({ id: req.body.user.id_user });
                res.status(200).send({ msg: "Ok", token: newToken });
            } else {
                let newToken = "Bearer " + generateToken({ id: req.body.user.id_user });
                res.status(406).send({ err: "Task cannot be entered", token: newToken });
            }
        });
    },
    update: async (req, res) => {
        await database.query("UPDATE tb_task SET ? WHERE id_task = ?", [req.body.task, req.params.id], (errors) => {
            if (!errors) {
                let newToken = "Bearer " + generateToken({ id: req.body.user.id_user });
                res.status(200).send({ msg: "Ok", token: newToken });
            } else {
                let newToken = "Bearer " + generateToken({ id: req.body.user.id_user });
                res.status(401).send({ err: "Error on update", token: newToken });
            }
        });
    },
    delete: async (req, res) => {
        await database.query("DELETE FROM tb_task WHERE id_task = ? ", [req.params.id], (errors) => {
            if (!errors) {
                let newToken = "Bearer " + generateToken({ id: req.body.user.id_user });
                res.status(200).send({ msg: "Ok", token: newToken });
            } else {
                let newToken = "Bearer " + generateToken({ id: req.body.user.id_user });
                res.status(401).send({ err: "Error on delete", token: newToken });
            }
        });
    }
}

module.exports = taskHandler;