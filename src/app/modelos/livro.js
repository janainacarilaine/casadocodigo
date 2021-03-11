const {check} = require('express-validator');

class Livro{
    static validacoes(){
        return [
            check('titulo').isLength({min : 5}).withMessage('O Título precisa ter ao menos 5 caracteres!'),
            check('preco').isCurrency().withMessage('O Preço precisa conter um valor monetário válido!')
        ]
    }

}
module.exports = Livro;