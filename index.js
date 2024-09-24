//importando o express
const express = require('express');
const app = express();
//models que representam tabelas no bd
const Pergunta = require('./database/models/Pergunta');
const Resposta = require('./database/models/Resposta');

//funcao que permite usar arquivos estaticos(como imagens)
app.use(express.static('public'));
//definindo ejs como motor de visualizacao
app.set('view engine', 'ejs');
//comando para receber dados de formularios via POST
app.use(express.urlencoded({extended: false}))

//rota principal
app.get('/', (req, res) => {
    //find all para buscar todos os retornos do model(tabela) Pergunta
    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC'] 
    ]})
    //passando o retorno de findAll para a view 'index' atraves da variavel perguntas
    .then(perguntas => {
        res.render('index', {perguntas: perguntas})
    });
});

//rota para realizar perguntas
app.get('/perguntar', (req, res) => {
    //retornando o o html 'perguntar' no retorno na rota
    res.render('perguntar');
});

//rota para salvar perguntas no bd
app.post('/salvarPergunta', (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    //adicionando as variaveis recebidas ao model Pergunta
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }) 
    //redireciona para a rota principal
    .then(() => {
        res.redirect("/");
    })
});

//rota de busca por id
app.get('/pergunta/:id', (req, res) => {
    const id = req.params.id;
    //encontra o registro onde o id e igual ao fornecido na rota
    Pergunta.findOne({
        where: {id: id}
    }) 
    //com esse valor, caso ele seja valido(!= undefined)
    .then(pergunta => {
        if(pergunta != undefined){
            //encontre todas as respostas com o id referente a pergunta
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }) 
            //envie os valores pergunta e respostas para a pagina ejs da pergunta
            .then(respostas => {
                res.render('pergunta',{
                    pergunta: pergunta,
                    respostas: respostas
                });
            })  
        }else{
            res.redirect('/');
        }
    });
});

//rota para receber os dados do formulario via post
app.post('/responder', (req, res) => {
    const corpo = req.body.corpo;
    const perguntaId = req.body.pergunta;
    //cria a resposta no model Resposta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }) 
    //redireciona para a pagina da pergunta
    .then(() => {
        res.redirect('/pergunta/' + perguntaId);
    })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`)
})