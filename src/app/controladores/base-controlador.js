const template = require('../views/template');

class BaseControlador{

    static rotas(){
        return {
            home: '/'
        };
    }

    loadHome(){
       return (req,resp) => {
            resp.marko(template.base.home);
        };
    }
}
module.exports = BaseControlador;