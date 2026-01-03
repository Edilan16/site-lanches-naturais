const produtos = [
    {
        id: 1,
        nome: 'Sandu√≠che Natural de Frango',
        descricao: 'Frango desfiado, alface, tomate e cenoura',
        preco: 12.00,
        imagem: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        nome: 'Sandu√≠che Natural de Atum',
        descricao: 'Atum, alface, tomate e milho',
        preco: 14.00,
        imagem: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        nome: 'Sandu√≠che Vegetariano',
        descricao: 'Queijo branco, alface, tomate, cenoura e beterraba',
        preco: 10.00,
        imagem: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        nome: 'Salada Completa',
        descricao: 'Mix de folhas, tomate, pepino, cenoura e molho',
        preco: 15.00,
        imagem: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        nome: 'Sandu√≠che de Peito de Peru',
        descricao: 'Peito de peru, queijo, alface e tomate',
        preco: 13.00,
        imagem: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        nome: 'Suco Natural 500ml',
        descricao: 'Laranja, morango, abacaxi ou lim√£o',
        preco: 8.00,
        imagem: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop'
    },
    {
        id: 7,
        nome: 'Wrap Integral',
        descricao: 'Frango, queijo, alface e molho especial',
        preco: 16.00,
        imagem: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop'
    },
    {
        id: 8,
        nome: 'A√ßa√≠ na Tigela',
        descricao: 'A√ßa√≠ batido com banana e granola',
        preco: 18.00,
        imagem: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop'
    }
];

let carrinho = [];

function carregarProdutos() {
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';
    
    produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.className = 'produto-card';
        produtoDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <div class="preco">R$ ${produto.preco.toFixed(2)}</div>
            <button class="btn-add" id="btn-${produto.id}" onclick="adicionarAoCarrinho(${produto.id}, this)">Adicionar ao Carrinho</button>
        `;
        container.appendChild(produtoDiv);
    });
}

function adicionarAoCarrinho(id, button) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    atualizarCarrinho();
    
    // Feedback visual
    if (button) {
        button.classList.add('added');
        const textoOriginal = button.textContent;
        button.textContent = '‚úì Adicionado!';
        setTimeout(() => {
            button.classList.remove('added');
            button.textContent = textoOriginal;
        }, 1000);
    }
}

function atualizarCarrinho() {
    const lista = document.getElementById('carrinho-lista');
    const contador = document.getElementById('carrinho-count');
    const totalElement = document.getElementById('carrinho-total');
    
    contador.textContent = carrinho.length;
    lista.innerHTML = '';
    
    if (carrinho.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #666;">Seu carrinho est√° vazio</p>';
        totalElement.textContent = '0.00';
        return;
    }
    
    carrinho.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'carrinho-item';
        itemDiv.innerHTML = `
            <span>${item.nome}</span>
            <span>R$ ${item.preco.toFixed(2)}</span>
            <button onclick="removerDoCarrinho(${index})" class="btn-remover">‚úï</button>
        `;
        lista.appendChild(itemDiv);
    });
    
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    totalElement.textContent = total.toFixed(2);
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
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
        alert('Seu carrinho est√° vazio!');
        return;
    }
    
    let mensagem = 'ÌªçÔ∏è *Novo Pedido - Lanches Naturais*\n\n';
    carrinho.forEach(item => {
        mensagem += `‚Ä¢ ${item.nome}\nR$ ${item.preco.toFixed(2)}\n\n`;
    });
    
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    mensagem += `\nÌ≤∞ *Total: R$ ${total.toFixed(2)}*`;
    
    // Verifica frete gr√°tis
    if (total >= 30) {
        mensagem += '\nÌ∫ö *FRETE GR√ÅTIS!*';
    }
    
    // Adiciona observa√ß√µes se houver
    const observacoes = document.getElementById('observacoes').value.trim();
    if (observacoes) {
        mensagem += `\n\nÌ≥ù *Observa√ß√µes:*\n${observacoes}`;
    }
    
    mensagem += '\n\nAguardo confirma√ß√£o! Ì∏ä';
    
    const numeroWhatsApp = '5511998468166';
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    
    carrinho = [];
    document.getElementById('observacoes').value = '';
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
