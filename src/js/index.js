let quant = 0;
console.log(quant)
let valorTotal = 0;




function filtragens(){
    filtrarHorfruti(produtos)
    filtrarTodos(produtos)
    filtrarPao(produtos)
    filtrarLat(produtos)
    filtroBusca(produtos)
}

function filtrarTodos(produtos) {
    const botaoFiltrarTodos     = document.querySelector('.filter__button--all')
    botaoFiltrarTodos.addEventListener('click', function(){
        montarDados(produtos)
     })
}


function filtrarHorfruti(produtos) {
    const botaoFiltraHortifruti = document.querySelector('.filter__button--hortifruti')
    botaoFiltraHortifruti.addEventListener('click', function(){
        const filtered =  produtos.filter(el =>el.secao == 'Hortifruti')
        montarDados(filtered)
     })
}

function filtrarPao(produtos) {
    const botaoFiltraPao = document.querySelector('.filter__button--pao')
    botaoFiltraPao.addEventListener('click', function(){
        const filtered =  produtos.filter(el =>el.secao == 'Panificadora')
        montarDados(filtered)
     })
}

function filtrarLat(produtos) {
    const botaoFiltrarLat = document.querySelector('.filter__button--lat')
    botaoFiltrarLat.addEventListener('click', function(){
        const filtered =  produtos.filter(el =>el.secao == 'Laticinio')
        montarDados(filtered)
     })
}

function filtroBusca (produtos) {
    const campoBusca = document.querySelector('.filter__input')
    campoBusca.addEventListener('keyup', function(){
    const filtered = produtos.filter(el => el.nome.toLowerCase().includes(campoBusca.value.toLowerCase().trim()))
    montarDados(filtered)
    })
}


function montarDados(produtos) {
    const vazio = document.querySelector(".carrinho__vazio")
    const quantidadeTet = document.querySelector(".carrinho__contagem")
    quantidadeTet.classList.add("display-none")
    vazio.classList.remove('display-none')
    const cardList              = document.querySelector('.produto__lista')
    cardList.innerHTML  = ""
    for (let i = 0; i<produtos.length; i++){
        const produto = produtos[i]
        criaCard(produto)
    }
}

function criaCard(produtos) {
const cardList      = document.querySelector('.produto__lista')
const card          = document.createElement('li')
card.classList.add("produto__item")
const cardImage     = criaCardImage(produtos)
const cardName      = criaCardName(produtos)
const cardPrice     = criaCardPrice(produtos)
const cardSection   = criaCardSection(produtos)
const cardNutrientes = criaCardNutrientes(produtos)
card.append(cardImage, cardName, cardSection,cardNutrientes,cardPrice)
cardList.append(card)
}

function criaCardImage(produtos){
    const cardImage = document.createElement('img')
    cardImage.classList.add("produto__imagem")
    cardImage.src = produtos.img
    cardImage.alt = produtos.nome
    return cardImage;
}

function criaCardName(produtos){
    const cardName = document.createElement('span')
    cardName.classList.add("produto__nome")
    cardName.innerText = produtos.nome
    return cardName;
}

function criaCardSection(produtos){
    const cardSection = document.createElement('span')
    cardSection.classList.add("produto__section")
    cardSection.innerText = `${produtos.categoria}`
    return cardSection;
}

function criaCardNutrientes(produtos){
    const cardNutrientes = document.createElement('ol')
    cardNutrientes.classList.add("produto__nutrientes")
    for (key in produtos.componentes) {
        const spanNutriente = document.createElement('li')
        spanNutriente.innerText = produtos.componentes[key]
        cardNutrientes.appendChild(spanNutriente)
    }
    return cardNutrientes;
}

function criaCardPrice(produtos){
    const cardDiv           = document.createElement('div')
    cardDiv.classList.add('space-between')
    const cardPrice         = document.createElement('p')
    cardPrice.innerText     = produtos.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    cardPrice.classList.add("produto__price")
    const cardButton        = document.createElement('button')
    cardButton.classList.add("produto__botao--comprar")
    cardButton.innerText = "Comprar"
    cardDiv.append(cardPrice, cardButton)
    cardButton.addEventListener('click', ()=>{
        quant ++;
        valorTotal += produtos.preco
        addtoCart(produtos)

    })
    return cardDiv
}


function addtoCart(produtos){

    const vazio = document.querySelector(".carrinho__vazio")
    const quantidadeTet = document.querySelector(".carrinho__contagem")
    quantidadeTet.classList.remove("display-none")
    vazio.classList.add('display-none')
    const quantidade = document.querySelector(".quantidade")
    const valor = document.querySelector(".valorTotal")
    quantidade.innerText = quant;
    valor.innerText = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })


    const carrinho = document.querySelector('.carrinho__lista')
        const carrinhoItem = document.createElement('li')
        carrinhoItem.classList.add('carrinho__item')
        const divLeft = document.createElement('div')
        divLeft.classList.add('carrinho__column-left')
        const carrinhoImage = document.createElement('img')
        carrinhoImage.src = produtos.img
        carrinhoImage.classList.add('carrinho__item-image')
        const carrinhoDetalhes = document.createElement('div')
        carrinhoDetalhes.classList.add('carrinho__item-detalhes')
        const itemName =  document.createElement('span')
        itemName.classList.add('carrinho__item-name')
        itemName.innerText = produtos.nome
        const itemSection = document.createElement('span')
        itemSection.innerText = produtos.secao
        itemSection.classList.add('carrinho__item-section')
        const itemPrice = document.createElement('span')
        itemPrice.innerText = produtos.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        itemPrice.classList.add('carrinho__item-price')
        const divRight = document.createElement('div')
        divRight.classList.add('carrinho__column-right')
        const carrinhoRemover = document.createElement('img')
        carrinhoRemover.src = "./src/img/trash.png"
        carrinhoRemover.classList.add('carrinho__remover-item')        

        carrinhoRemover.addEventListener('click', ()=>{
            quant --;
            valorTotal -= produtos.preco
            removetoCart()
        })
        carrinhoDetalhes.append(itemName, itemSection, itemPrice)
        divLeft.append(carrinhoImage, carrinhoDetalhes)
        divRight.append(carrinhoRemover)
        carrinhoItem.append(divLeft, divRight)
        carrinho.append(carrinhoItem)

        

}

function removetoCart(){
    const quantidade = document.querySelector(".quantidade")
    const valor = document.querySelector(".valorTotal")
    quantidade.innerText = quant;
    valor.innerText = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    if (quant === 0){
            const vazio = document.querySelector(".carrinho__vazio")
    const quantidadeTet = document.querySelector(".carrinho__contagem")
    quantidadeTet.classList.add("display-none")
    vazio.classList.remove('display-none')
    }
    const div = document.querySelector(".carrinho__item")
    div.remove();
}


    




montarDados(produtos)
filtragens (produtos)


