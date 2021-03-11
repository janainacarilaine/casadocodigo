const passport = require('passport');
const template = require('../views/template');
const LivroControlador = require('./livro-controlador');

class BaseControlador{

    static rotas(){
        return {
            home: '/',
            login: '/login'
        };
    }

    home(){
       return (req,resp) => {
            resp.marko(template.base.home);
        };
    }

    login(){
        return (req,resp) => {
            resp.marko(template.base.login);
        };
    }

    //lógica de login
    efetuaLogin(){
        return (req, resp, next) => {
            const passport = req.passport;
            passport.authenticate('local', 
                (erro, usuario, info) => {
                    if (info) 
                        return resp.marko(template.base.login);
                    
                    if (erro) 
                        return next(erro);
                    
                    req.login(usuario, erro => {
                        if (erro)
                            return next(erro);
                        
                        return resp.redirect(LivroControlador.rotas().lista);

                    });
                }
            )(req, resp, next);
            
        };
    }

    
}
module.exports = BaseControlador;