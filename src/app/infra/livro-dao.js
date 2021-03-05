class LivroDao {
    
    constructor(db){
        this._db =db;
    }

    lista(){
        return new Promise((resolve,reject) => {
            this._db.all('SELECT * FROM LIVROS', (erro, resultados) => {
                    if (erro) 
                        return reject('Não foi possível listar os livros!');
                    return resolve(resultados);     
                
            })
        })
    }

    adiciona(dadosLivro){
        return new Promise((resolve,reject) => {
            this._db.run(
                `
                    INSERT INTO LIVROS(titulo, preco, descricao)
                    VALUES(?,?,?)
                `,
                
                [
                    dadosLivro.titulo,
                    dadosLivro.preco,
                    dadosLivro.descricao
                ],
                
                (erro) => {
                    if (erro) {
                       console.log(erro);
                       return reject('Não foi possível adicionar o livro!');
                    }

                    resolve();
                }


            )

        })
    }
}
module.exports = LivroDao;    