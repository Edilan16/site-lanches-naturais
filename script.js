const produtos = [
    {id: 1, nome: "Sanduíche Natural de Frango", descricao: "Peito de frango desfiado, alface, tomate, cenoura ralada e maionese caseira", preco: 12.00, imagem: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop"},
    {id: 2, nome: "Sanduíche Natural de Atum", descricao: "Atum, milho, alface, tomate e cream cheese", preco: 13.50, imagem: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop"},
    {id: 3, nome: "Sanduíche Vegetariano", descricao: "Queijo branco, alface, tomate, cenoura, beterraba e cream cheese", preco: 11.00, imagem: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop"},
    {id: 4, nome: "Wrap de Frango", descricao: "Frango grelhado, alface, tomate e molho especial em tortilha integral", preco: 14.00, imagem: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop"},
    {id: 5, nome: "Salada Caesar", descricao: "Alface romana, frango grelhado, croutons, parmesão e molho caesar", preco: 15.00, imagem: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop"},
    {id: 6, nome: "Suco Verde Detox", descricao: "Couve, limão, gengibre, maçã e hortelã (300ml)", preco: 8.00, imagem: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop"},
    {id: 7, nome: "Suco de Laranja Natural", descricao: "Suco 100% natural sem açúcar (300ml)", preco: 7.00, imagem: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop"},
    {id: 8, nome: "Bowl de Açaí", descricao: "Açaí com granola, banana e mel", preco: 16.00, imagem: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop"}
];

let carrinho = [];

function carregarProdutos() {
    const grid = document.getElementById('produtos-grid');
    produtos.forEach(produto => {
        const card = `
            <div class="produto-card">
                <div class="produto-imagem">
                    <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
                </div>
                <div class="produto-info">
                    <h3 class="produto-nome">${produto.nome}</h3>
                    <p class="produto-descricao">${produto.descricao}</p>
                    <div class="produto-footer">
                        <span class="produto-preco">R$ ${produto.preco.toFixed(2)}</span>
                        <button class="btn-add" onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    atualizarCarrinho();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    document.getElementById('carrinho-count').textContent = carrinho.length;
    const itensDiv = document.getElementById('itens-carrinho');
    
    if (carrinho.length === 0) {
        itensDiv.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
        document.getElementById('total-carrinho').textContent = '0,00';
        return;
    }
    
    let itensHTML = '';
    let total = 0;
    
    carrinho.forEach((item, index) => {
        total += item.preco;
        itensHTML += `
            <div class="item-carrinho">
                <div class="item-info">
                    <h4>${item.nome}</h4>
                    <span>R$ ${item.preco.toFixed(2)}</span>
                </div>
                <button class="btn-remover" onclick="removerDoCarrinho(${index})">Remover</button>
            </div>
        `;
    });
    
    itensDiv.innerHTML = itensHTML;
    document.getElementById('total-carrinho').textContent = total.toFixed(2).replace('.', ',');
}

function toggleCarrinho() {
    const modal = document.getElementById('modal-carrinho');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function limparCarrinho() {
    if (carrinho.length > 0 && confirm('Deseja limpar o carrinho?')) {
        carrinho = [];
        atualizarCarrinho();
    }
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    let mensagem = '���️ *Novo Pedido - Lanches Naturais*\n\n';
    carrinho.forEach(item => {
        mensagem += `• ${item.nome}\nR$ ${item.preco.toFixed(2)}\n\n`;
    });
    
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    mensagem += `\n💰 *Total: R$ ${total.toFixed(2)}*\n\nAguardo confirmação! 😊`;
    
    const numeroWhatsApp = '5511998468166';
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    
    carrinho = [];
    atualizarCarrinho();
    toggleCarrinho();
}

window.onclick = function(event) {
    const modal = document.getElementById('modal-carrinho');
    if (event.target === modal) toggleCarrinho();
}

document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();
    atualizarCarrinho();
});
