module.exports = app => {    
    const controllerUser = require("../controllers/user");

    app.post("/login", controllerUser.login);
    app.post("/cadastro", controllerUser.signUp)

    app.route("/users/:id")
        .all(controllerUser.auth)             
        .get(controllerUser.viewData)
        .put(controllerUser.dataUpdate)
        .delete(controllerUser.delete);
 };