const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('guia_perguntas','myuser','root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch((err) => {
        console.log('Não foi possível conectar ao banco de dados: ', err);
    });

module.exports = sequelize;
