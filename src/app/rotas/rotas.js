const rotasBase = require('./rotas-base');
const rotasLivro = require('./rotas-livro');

module.exports = (app) => {
    rotasBase(app);
    rotasLivro(app);
}