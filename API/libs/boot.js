/**
 * Script que realiza a abertura do servidor
 */
module.exports = app => {
    app.listen(app.get("port"), () => {
        console.log(`Server aberto - Porta: ${app.get("port")}`);
    });
};