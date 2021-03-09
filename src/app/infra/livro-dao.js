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
            });
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
                
                erro => {
                    if (erro) {
                       console.log(erro);
                       return reject('Não foi possível adicionar o livro!');
                    }

                    resolve();
                }
            )
        });
    }
    
    buscaPorId(id){
        return new Promise((resolve,reject) => {
            this._db.get('SELECT * FROM LIVROS WHERE id = ?', id, 
                (erro, livro) => {
                    if (erro) 
                        return reject('Não foi possível obter o livro!');
                    
                    return resolve(livro);     
            
                }
            );
        })
    }

    atualiza(dadosLivro){
        return new Promise((resolve,reject) => {
            this._db.run(
                `
                    UPDATE livros SET titulo = ?, preco = ? AND descricao = ?
                    WHERE id = ?
                `,
            
                [
                    dadosLivro.titulo,
                    dadosLivro.preco,
                    dadosLivro.descricao,
                    dadosLivro.id
                ],
            
                erro => {
                    if (erro) 
                        return reject('Não foi possível obter o livro!');
                    
                    return resolve();     
            
                }
            
            )
        })
            
    }

    remove(id){
        return new Promise((resolve,reject) => {
            this._db.run(`DELETE FROM livros WHERE id = ?`, id,
                erro => {
                    if (erro)
                        return reject('Não foi possível deletar o livro');
                    
                    return resolve();
                }
    
            )
        })
    }
}
module.exports = LivroDao;    