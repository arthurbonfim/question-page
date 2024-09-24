const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const Pergunta = sequelize.define('Perguntas',{
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

sequelize.sync({force: false}) //force: false impede que a tabela seja recriada caso ela ja exista
    .then(() => {
        console.log('Modelo Perguntas sincronizado com o banco de dados.');
    })
    .catch((err) => {
        console.error('Erro ao sincronizar o modelo Pergunta:', err);
    });

module.exports = Pergunta;