const { validationResult } = require('express-validator');

const LivroDao = require('../infra/livro-dao')
const db = require('../../config/database');

const template = require('../views/template');

class LivroControlador{

    static rotas(){
        return {
            autenticadas: '/livros*',
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            remocao: '/livros/:id'
        };
    }

    lista(){
       return (req, resp) => {
           
            const livroDao = new LivroDao(db);
            livroDao.lista()
                .then( livros =>   
                    resp.marko(template.livros.lista,
                        {
                            livros: livros                   
                        }
                    )
                ).catch(erro => console.log(erro));
        };
    }

    formularioCadastro(){
        return (req, resp) => {
            resp.marko(template.livros.form, { livro: {} });
        };
    }

    formularioEdicao(){
        return  (req,resp) => {
            const id = req.params.id;
            const livroDao = new LivroDao(db);
    
            livroDao.buscaPorId(id)
                .then(livro => 
                    resp.marko(template.livros.form,
                        {livro : livro}
                    )
                )
                .catch(erro => console.log(erro));
        }
    }

    cadastra(){
        return (req,resp) => {
            console.log(req.body);
            const livroDao = new LivroDao(db);
            
            const erros = validationResult(req);
            if (!erros.isEmpty()){
                return resp.marko(template.livros.form,
                    { 
                        livro: req.body,
                        errosValidacao : erros.array()
                    }
                );
            }

            livroDao.adiciona(req.body)
                .then(resp.redirect(LivroControlador.rotas().lista))
                .catch(erro => console.log(erro))
        };
    }

    edita(){
        return (req,resp) => {

            console.log(req.body);
            const livroDao = new LivroDao(db);
            
            livroDao.atualiza(req.body)
                .then(resp.redirect(LivroControlador.rotas().lista))
                .catch(erro => console.log(erro))
        }
    }

    deleta(){
        return (req,resp) => {

            const id = req.params.id;
    
            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                .then(()=> resp.status(200).end())
                .catch(erro => console.log(erro))
        };
    }

}
module.exports = LivroControlador;