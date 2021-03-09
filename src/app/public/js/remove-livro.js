let tabelaLivros = document.querySelector('#livros');
tabelaLivros.addEventListener('click', (event) => {
    let elementoClicado = event.target;

    if (elementoClicado.dataset.type == 'remocao'){
        let livroId = elementoClicado.dataset.ref;
        
        fetch(`http://localhost:3000/livros/${livroId}`,  { method : 'DELETE' })
        .then(resposta => {
            let tr = elementoClicado.closest(`#livro_${livroId}`);
            tr.remove();

        }).catch(erro => console.log(erro));
    }
})
