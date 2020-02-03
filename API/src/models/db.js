/**
 * Todas as configurações referente ao banco de dados
 */


module.exports = app => {
    const host = "localhost";
    const user = "root";
    const pass = "";
    const db = "to_do";
    const mysql = require("mysql");

    var pool = mysql.createPool({ 
        host : host, 
        user : user, 
        password : pass, 
        database : db, 
        connectionLimit : 10
    });

    pool.getConnection(function (err, conn) {
         if (err) 
            return 400;
    });
    return pool;    


};
