let valorTotal = 0;


function filtrarHorfruti(produtos) {
    const botaoFiltraHortifruti = document.querySelector('.estiloGeralBotoes--filtrarHortifruti')
    botaoFiltraHortifruti.addEventListener('click', function(){
        const filtered =  produtos.filter(el =>el.secao == 'Hortifruti')
        const valor = document.querySelector('.precoTotal')
        valorTotal = 0;
        valor.innerHTML = ""
        montarDados(filtered)
     })

}

function filtrarTodos(produtos) {
    const botaoFiltrarTodos     = document.querySelector('.estiloGeralBotoes--mostrarTodos')
    botaoFiltrarTodos.addEventListener('click', function(){
        const valor = document.querySelector('.precoTotal')
        valorTotal = 0;
        valor.innerHTML = ""
        montarDados(produtos)
     })

}

function filtroBusca (produtos) {
    const campoBusca = document.querySelector('.campoBuscaPorNome')
    const botaoPesquisar = document.querySelector('.estiloGeralBotoes--botaoBuscaPorNome')
    campoBusca.addEventListener('keyup', function(){
        const valor = document.querySelector('.precoTotal')
        valorTotal = 0;
        valor.innerHTML = ""
    const filtered = produtos.filter(el => el.nome.toLowerCase().includes(campoBusca.value.toLowerCase().trim()))
    montarDados(filtered)
    })
}

function criaCard(produtos) {
    
    const cardList      = document.querySelector('.listaProdutos')
    const card          = document.createElement('li')
    const cardImage     = criaCardImage(produtos)
    const cardName      = criaCardName(produtos)
    const cardPrice     = criaCardPrice(produtos)
    const cardSection   = criaCardSection(produtos)
    card.append(cardImage, cardName, cardPrice, cardSection)
    cardList.append(card)
}

function exibirValorTotal(somaProdutos){
    const valor = document.querySelector('.precoTotal')
    valor.innerText = somaProdutos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return valor;
}

function montarDados(produtos) {
    const cardList              = document.querySelector('.listaProdutos')
    cardList.innerHTML  = ""
    for (let i = 0; i<produtos.length; i++){
        const produto = produtos[i]
        valorTotal += produtos[i].preco
        criaCard(produto)
    }
    exibirValorTotal(valorTotal)
}

function criaCardImage(produtos){
    const cardImage = document.createElement('img')
    cardImage.src = produtos.img
    cardImage.alt = produtos.nome
    return cardImage;
}

function criaCardName(produtos){
    const cardName = document.createElement('h3')
    cardName.innerText = produtos.nome
    return cardName;
}

function criaCardPrice(produtos){
    const cardPrice         = document.createElement('p')
    cardPrice.innerText     = produtos.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return cardPrice
}

function criaCardSection(produtos){
    const cardSection = document.createElement('span')
    cardSection.innerText = `categoria ${produtos.categoria}`
    return cardSection;
}

filtragens()
montarDados(produtos)