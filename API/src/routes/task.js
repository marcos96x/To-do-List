module.exports = app => {  
    let tasksHandler = require("./../controllers/tasks")
    
    app.post("/tasks/show", [tasksHandler.auth, tasksHandler.showAll]);
    app.post("/tasks/show/:id", [tasksHandler.auth, tasksHandler.showOne]);
    
    app.route("/tasks/:id")
        .all(tasksHandler.auth)
        .post(tasksHandler.add)
        .put(tasksHandler.update)
        .delete(tasksHandler.delete);
 };