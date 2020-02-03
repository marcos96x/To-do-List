const database = require("../models/db")();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("./../../libs/auth");

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}
const userHandler = {
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
                            if (decoded.id == req.params.id || decoded.id == req.body.user.id_user) {
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
    login: async (req, res) => {
        const { login, password } = req.body;

        try {
            await database.query("SELECT * FROM tb_user WHERE login_user = ?", login, async (_, rows) => {
                if (!rows || rows.length == 0) {
                    return res.status(404).send({ err: "User not found" });
                } else {
                    const user = rows[0];
                   await bcrypt.compare(password, user.password_user)
                        .then((result) => {
                            if (!result) {
                                return res.status(401).send({ err: "Invalid Password" });
                            } else {
                                user.password_user = undefined;
                                let newToken = "Bearer " + generateToken({ id: user.id_user });
                                return res.status(200).send({ user: user, token: newToken });
                            }
                        });
                }
            })
        } catch (err) {
            return res.status(403).send({ err: err }).end()
        }
    },
    signUp: async (req, res) => {
        const { name_user, email_user, login_user, password_user } = req.body;
        try {
            await database.query("SELECT * FROM tb_user WHERE email_user = ? OR login_user = ?", [email_user, login_user], async (_, rows) => {
                if (rows && (rows.length != [] || rows.length > 0)) {
                    return res.status(401).send({ err: "Email or login has been used" });
                } else {
                    await bcrypt.hash(password_user, 10, async (__, hash) => {
                        let sql = `INSERT INTO tb_user VALUES (default, '${name_user}', '${login_user}', '${email_user}','${hash}');`
                        database.query(sql, (___, rows2) => {
                            database.query("SELECT id_user, name_user, email_user, login_user FROM tb_user WHERE id_user = ?", rows2.insertId, (____, row) => {
                                let newToken = "Bearer " + generateToken({ "id": rows2.insertId });
                                return res.status(200).send({ user: row[0], token: newToken }).end();
                            })
                        })
                    });
                }
            })
        } catch (err) {
            return res.status(403).send({ err: err }).end()
        }
    },
    viewData: async (req, res) => {
        try {
            await database.query("SELECT id_user, name_user, login_user, email_user FROM tb_user WHERE id_user = ?", [req.params.id], (_, rows) => {
                if (rows.length == 0) {
                    return res.status(404).send({ err: "User not found" });
                } else {
                    let row = rows[0];
                    let newToken = "Bearer " + generateToken({ id: req.params.id });
                    return res.status(200).send({ user: row, token: newToken });
                }
            })
        } catch (err) {
            return res.status(403).send({ err: err }).end()
        }
    },
    dataUpdate: async (req, res) => {
        try {
            if(req.body.user.password_user) {
                await bcrypt.hash(req.body.user.password_user, 10, async (__, hash) => {
                    req.body.user.password_user = hash;
                    await database.query("UPDATE tb_user SET ? WHERE id_user = ?", [req.body.user, req.params.id], async () => {
                        await database.query("SELECT id_user, name_user, email_user FROM tb_user WHERE id_user = ?", [req.params.id], (_, rows) => {
                            if (rows.length == 0)
                                return res.status(404).send({ err: "User not found" });
                            else {
                                let row = rows[0];
                                let newToken = "Bearer " + generateToken({ id: req.params.id });
                                return res.status(200).send({ user: row, token: newToken });
                            }
                        })
                    })
                });
            }
            else {
                await database.query("UPDATE tb_user SET ? WHERE id_user = ?", [req.body.user, req.params.id], async () => {
                    await database.query("SELECT id_user, name_user, email_user FROM tb_user WHERE id_user = ?", [req.params.id], (_, rows) => {
                        if (rows.length == 0)
                            return res.status(404).send({ err: "User not found" });
                        else {
                            let row = rows[0];
                            let newToken = "Bearer " + generateToken({ id: req.params.id });
                            return res.status(200).send({ user: row, token: newToken });
                        }
                    })
                })
            }
            
        } catch (err) {
            return res.status(403).send({ err: err }).end()
        }
    },
    delete: async (req, res) => {
        try {
            await database.query("DELETE FROM tb_task WHERE id_user = ? ;", [req.params.id], async () => {
                await database.query("DELETE FROM tb_user WHERE id_user = ? ;", [req.params.id], () => {
                    return res.status(200).send({ msg: "Ok" });
                })
            })
        } catch (err) {
            return res.status(403).send({ err: err }).end()
        }
    }
}

module.exports = userHandler;