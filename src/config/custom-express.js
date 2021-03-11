require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const template = require('../app/views/template');

app.use('/estatico', express.static('src/app/public'));

app.use(bodyParser.urlencoded(
    {extended : true})
);

//middleware de sobrescrita de metodo 
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

//módulo de lógica de sessão e autenticação
const sessaoAutenticacao = require('./sessao-autenticacao');
sessaoAutenticacao(app);

const rotas = require('../app/rotas/rotas');
rotas(app);

//middleware de pagina nao encontrada
app.use((req,resp,next) => {
    return resp.status(404).marko(template.base.erro404)
});

//middleware de tratamento de erro interno
app.use((erro,req,resp,next) => {
    return resp.status(500).marko(template.base.erro500)
});

module.exports = app;