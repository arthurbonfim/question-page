const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const Resposta = sequelize.define('respostas',{
    corpo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false})
    .then(() => {
        console.log('Modelo Respostas sincronizado com o banco de dados.')
    })
    .catch((err) => {
        console.error('Erro ao sincronizar o modelo Pergunta:', err);
    });

module.exports = Resposta;