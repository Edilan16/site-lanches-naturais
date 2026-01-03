// Carregar produtos do localStorage ou usar produtos padrão
function getProdutos() {
    const produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
        const produtos = JSON.parse(produtosSalvos);
        // Retornar apenas produtos disponíveis
        return produtos.filter(p => p.disponivel !== false);
    }
    
    // Produtos padrão
    return [
        {
            id: 1,
            nome: 'Sanduíche Natural de Frango',
            descricao: 'Frango desfiado, alface, tomate e cenoura',
            preco: 12.00,
            imagem: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop',
            disponivel: true
        },
        {
            id: 2,
            nome: 'Sanduíche Natural de Atum',
            descricao: 'Atum, alface, tomate e milho',
            preco: 14.00,
            imagem: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop',
            disponivel: true
        },
        {
            id: 3,
            nome: 'Sanduíche Vegetariano',
            descricao: 'Queijo branco, alface, tomate, cenoura e beterraba',
            preco: 10.00,
            imagem: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=300&fit=crop',
            disponivel: true
        },
        {
            id: 4,
            nome: 'Salada Completa',
            descricao: 'Mix de folhas, tomate, pepino, cenoura e molho',
            preco: 15.00,
            imagem: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
            disponivel: true
        },
        {
            id: 5,
            nome: 'Sanduíche de Peito de Peru',
            descricao: 'Peito de peru, queijo, alface e tomate',
            preco: 13.00,
            imagem: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
            disponivel: true
        },
        {
            id: 6,
            nome: 'Suco Natural 500ml',
            descricao: 'Laranja, morango, abacaxi ou limão',
            preco: 8.00,
            imagem: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
            disponivel: true
        },
        {
            id: 7,
            nome: 'Wrap Integral',
            descricao: 'Frango, queijo, alface e molho especial',
            preco: 16.00,
            imagem: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
            disponivel: true
        },
        {
            id: 8,
            nome: 'Açaí na Tigela',
            descricao: 'Açaí batido com banana e granola',
            preco: 18.00,
            imagem: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
            disponivel: true
        }
    ];
}

// Carregar combos do localStorage ou usar combos padrão
function getCombos() {
    const combosSalvos = localStorage.getItem('combos');
    if (combosSalvos) {
        const combos = JSON.parse(combosSalvos);
        return combos.filter(c => c.ativo !== false);
    }
    
    // Combos padrão
    return [
        {
            id: 'combo1',
            nome: 'Combo Família',
            descricao: '4 Sanduíches + 2 Saladas',
            produtosInclusos: [
                { id: 1, quantidade: 2, nome: 'Sanduíche de Frango' },
                { id: 2, quantidade: 2, nome: 'Sanduíche de Atum' },
                { id: 4, quantidade: 2, nome: 'Salada Completa' }
            ],
            precoNormal: 82.00,
            precoCombo: 69.90,
            economia: 12.10,
            imagem: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
            ativo: true
        },
        {
            id: 'combo2',
            nome: 'Combo Fitness',
            descricao: '2 Vegetarianos + 1 Salada',
            produtosInclusos: [
                { id: 3, quantidade: 2, nome: 'Sanduíche Vegetariano' },
                { id: 4, quantidade: 1, nome: 'Salada Completa' }
            ],
            precoNormal: 35.00,
            precoCombo: 29.90,
            economia: 5.10,
            imagem: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
            ativo: true
        }
    ];
}

let carrinho = [];

function carregarProdutos() {
    const container = document.getElementById('produtos-grid');
    container.innerHTML = '';
    
    // Carregar e exibir combos primeiro
    const combos = getCombos();
    combos.forEach(combo => {
        const comboDiv = document.createElement('div');
        comboDiv.className = 'produto-card combo-card';
        comboDiv.innerHTML = `
            <div class="combo-badge">COMBO</div>
            <img src="${combo.imagem}" alt="${combo.nome}">
            <h3>${combo.nome}</h3>
            <p>${combo.descricao}</p>
            <div class="combo-itens">
                ${combo.produtosInclusos.map(p => `<span>${p.quantidade}x ${p.nome}</span>`).join('')}
            </div>
            <div class="combo-precos">
                <span class="preco-antigo">De R$ ${combo.precoNormal.toFixed(2)}</span>
                <div class="preco">R$ ${combo.precoCombo.toFixed(2)}</div>
                <span class="economia">Economize R$ ${combo.economia.toFixed(2)}</span>
            </div>
            <button class="btn-add" onclick="adicionarComboAoCarrinho('${combo.id}', this)">Adicionar Combo</button>
        `;
        container.appendChild(comboDiv);
    });
    
    const produtos = getProdutos(); // Carrega produtos do localStorage
    
    if (produtos.length === 0 && combos.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">Nenhum produto disponível no momento.</p>';
        return;
    }
    
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

function adicionarComboAoCarrinho(comboId, button) {
    const combos = getCombos();
    const combo = combos.find(c => c.id === comboId);
    
    if (!combo) {
        alert('Combo não encontrado!');
        return;
    }
    
    // Adiciona o combo como um item especial no carrinho
    const itemExistente = carrinho.find(item => item.id === comboId);
    
    if (itemExistente) {
        itemExistente.quantidade = (itemExistente.quantidade || 1) + 1;
    } else {
        carrinho.push({
            id: comboId,
            nome: combo.nome,
            descricao: combo.descricao,
            preco: combo.precoCombo,
            imagem: combo.imagem,
            quantidade: 1,
            isCombo: true,
            produtosInclusos: combo.produtosInclusos
        });
    }
    
    // Feedback visual
    button.textContent = '✓ Adicionado!';
    button.style.background = '#10b981';
    
    setTimeout(() => {
        button.textContent = 'Adicionar Combo';
        button.style.background = '';
    }, 1500);
    
    atualizarCarrinho();
}

function adicionarAoCarrinho(id, button) {
    const produtos = getProdutos();
    const produto = produtos.find(p => p.id === id);
    
    if (!produto) {
        alert('Produto não encontrado!');
        return;
    }
    
    // Verifica se o produto já está no carrinho
    const itemExistente = carrinho.find(item => item.id === id && !item.isCombo);
    
    if (itemExistente) {
        itemExistente.quantidade = (itemExistente.quantidade || 1) + 1;
    } else {
        carrinho.push({...produto, quantidade: 1});
    }
    
    atualizarCarrinho();
    
    // Feedback visual
    if (button) {
        button.classList.add('added');
        const textoOriginal = button.textContent;
        button.textContent = '✓ Adicionado!';
        setTimeout(() => {
            button.classList.remove('added');
            button.textContent = textoOriginal;
        }, 1000);
    }
}

function atualizarCarrinho() {
    const lista = document.getElementById('itens-carrinho');
    const contador = document.getElementById('carrinho-count');
    const totalElement = document.getElementById('total-carrinho');
    const descontoDiv = document.getElementById('desconto-aplicado');
    const valorDescontoElement = document.getElementById('valor-desconto');
    const totalComDescontoElement = document.getElementById('total-com-desconto');
    
    const totalItens = carrinho.reduce((sum, item) => sum + (item.quantidade || 1), 0);
    contador.textContent = totalItens;
    
    if (carrinho.length === 0) {
        lista.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
        totalElement.textContent = '0.00';
        if (descontoDiv) descontoDiv.style.display = 'none';
        return;
    }
    
    lista.innerHTML = carrinho.map((item, index) => {
        const quantidade = item.quantidade || 1;
        const subtotal = item.preco * quantidade;
        return `
        <div class="item-carrinho">
            <div class="item-info">
                <h4>${item.nome}</h4>
                <div class="item-quantidade">
                    <button onclick="alterarQuantidade(${index}, -1)" class="btn-qtd">-</button>
                    <span class="qtd-numero">${quantidade}</span>
                    <button onclick="alterarQuantidade(${index}, 1)" class="btn-qtd">+</button>
                </div>
                <span class="item-subtotal">R$ ${subtotal.toFixed(2)}</span>
            </div>
            <button onclick="removerDoCarrinho(${index})" class="btn-remover">✕</button>
        </div>
    `;
    }).join('');
    
    const total = carrinho.reduce((sum, item) => sum + (item.preco * (item.quantidade || 1)), 0);
    totalElement.textContent = total.toFixed(2);
    
    // Calcular desconto
    if (cupomAtual && descontoDiv) {
        let desconto = 0;
        if (cupomAtual.tipo === 'percentual') {
            desconto = total * (cupomAtual.valor / 100);
        } else {
            desconto = cupomAtual.valor;
        }
        
        const totalFinal = Math.max(0, total - desconto);
        
        valorDescontoElement.textContent = desconto.toFixed(2);
        totalComDescontoElement.textContent = totalFinal.toFixed(2);
        descontoDiv.style.display = 'block';
    } else if (descontoDiv) {
        descontoDiv.style.display = 'none';
    }
}

function alterarQuantidade(index, delta) {
    if (!carrinho[index]) return;
    
    const novaQuantidade = (carrinho[index].quantidade || 1) + delta;
    
    if (novaQuantidade <= 0) {
        carrinho.splice(index, 1);
    } else {
        carrinho[index].quantidade = novaQuantidade;
    }
    
    atualizarCarrinho();
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
        alert('Seu carrinho está vazio!');
        return;
    }
    
    let mensagem = '\u{1F6CD}\uFE0F *Novo Pedido - Lanches Naturais*\n\n';
    
    carrinho.forEach(item => {
        const quantidade = item.quantidade || 1;
        const subtotal = item.preco * quantidade;
        
        if (item.isCombo) {
            mensagem += `\u{1F381} *${quantidade}x ${item.nome}* (COMBO)\n`;
            mensagem += `   Itens inclusos:\n`;
            item.produtosInclusos.forEach(p => {
                mensagem += `   - ${p.quantidade}x ${p.nome}\n`;
            });
            mensagem += `   R$ ${subtotal.toFixed(2)}\n\n`;
        } else {
            mensagem += `• *${quantidade}x ${item.nome}*\n`;
            mensagem += `   R$ ${subtotal.toFixed(2)}\n\n`;
        }
    });
    
    const subtotalGeral = carrinho.reduce((sum, item) => sum + (item.preco * (item.quantidade || 1)), 0);
    
    // Aplicar cupom de desconto se houver
    let total = subtotalGeral;
    let descontoAplicado = 0;
    
    if (cupomAtual) {
        const cupons = JSON.parse(localStorage.getItem('cupons') || '{}');
        const cupom = cupons[cupomAtual];
        
        if (cupom && cupom.ativo) {
            if (cupom.tipo === 'percentual') {
                descontoAplicado = (subtotalGeral * cupom.valor) / 100;
            } else {
                descontoAplicado = cupom.valor;
            }
            total = subtotalGeral - descontoAplicado;
            
            mensagem += `\u{1F4B0} Subtotal: R$ ${subtotalGeral.toFixed(2)}\n`;
            mensagem += `\u{1F3AB} Desconto (${cupomAtual}): -R$ ${descontoAplicado.toFixed(2)}\n`;
        }
    }
    
    mensagem += `\n\u{1F4B5} *Total: R$ ${total.toFixed(2)}*`;
    
    // Verifica frete grátis
    if (total >= 30) {
        mensagem += '\n\u{1F69A} *FRETE GRÁTIS!*';
    }
    
    // Adiciona observações se houver
    const observacoes = document.getElementById('observacoes').value.trim();
    if (observacoes) {
        mensagem += `\n\n\u{1F4DD} *Observações:*\n${observacoes}`;
    }
    
    mensagem += '\n\nAguardo confirmação! \u{1F60A}';
    
    const numeroWhatsApp = '5511998468166';
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    
    carrinho = [];
    cupomAtual = null;
    document.getElementById('observacoes').value = '';
    document.getElementById('input-cupom').value = '';
    atualizarCarrinho();
    toggleCarrinho();
}

// Sistema de Horário de Funcionamento
function verificarHorario() {
    const badge = document.getElementById('status-horario');
    if (!badge) return true;
    
    // Verificar se a loja foi fechada manualmente
    const lojaAberta = localStorage.getItem('loja_aberta') !== 'false';
    if (!lojaAberta) {
        badge.className = 'status-badge fechado';
        badge.textContent = '🔴 FECHADO - Loja temporariamente fechada';
        return false;
    }
    
    const config = JSON.parse(localStorage.getItem('config_horario') || '{"seg_sex": "08:00-18:00", "sab": "08:00-14:00", "dom": "fechado"}');
    const agora = new Date();
    const diaSemana = agora.getDay(); // 0=dom, 1=seg, ..., 6=sab
    const horaAtual = agora.getHours() * 60 + agora.getMinutes(); // em minutos
    
    let horario;
    if (diaSemana === 0) { // Domingo
        horario = config.dom;
    } else if (diaSemana === 6) { // Sábado
        horario = config.sab;
    } else { // Segunda a Sexta
        horario = config.seg_sex;
    }
    
    if (horario === 'fechado') {
        badge.className = 'status-badge fechado';
        badge.textContent = '🔴 FECHADO';
        return false;
    }
    
    const [inicio, fim] = horario.split('-');
    const [horaIni, minIni] = inicio.split(':').map(Number);
    const [horaFim, minFim] = fim.split(':').map(Number);
    const minutosInicio = horaIni * 60 + minIni;
    const minutosFim = horaFim * 60 + minFim;
    
    const aberto = horaAtual >= minutosInicio && horaAtual < minutosFim;
    
    badge.className = `status-badge ${aberto ? 'aberto' : 'fechado'}`;
    badge.textContent = aberto ? '🟢 ABERTO AGORA' : `🔴 FECHADO - Abre às ${inicio}h`;
    
    return aberto;
}

// Sistema de Cupons
let cupomAtual = null;

function aplicarCupom() {
    const codigo = document.getElementById('cupom').value.trim().toUpperCase();
    const mensagem = document.getElementById('cupom-mensagem');
    
    if (!codigo) {
        mensagem.className = 'cupom-mensagem erro';
        mensagem.textContent = '❌ Digite um código de cupom';
        return;
    }
    
    const cupons = JSON.parse(localStorage.getItem('cupons') || '{}');
    const cupom = cupons[codigo];
    
    if (!cupom || !cupom.ativo) {
        mensagem.className = 'cupom-mensagem erro';
        mensagem.textContent = '❌ Cupom inválido ou expirado';
        cupomAtual = null;
        atualizarCarrinho();
        return;
    }
    
    cupomAtual = cupom;
    mensagem.className = 'cupom-mensagem sucesso';
    mensagem.textContent = `✅ Cupom "${codigo}" aplicado! ${cupom.tipo === 'percentual' ? cupom.valor + '%' : 'R$ ' + cupom.valor.toFixed(2)} de desconto`;
    
    atualizarCarrinho();
}

// Carregar Depoimentos
function carregarDepoimentos() {
    const depoimentos = JSON.parse(localStorage.getItem('depoimentos') || '[]');
    const container = document.getElementById('depoimentos-grid');
    
    if (!container) return;
    
    if (depoimentos.length === 0) {
        // Depoimentos padrão
        const depoimentosPadrao = [
            { nome: 'Maria Silva', avatar: 'M', estrelas: 5, texto: 'Simplesmente perfeito! Os lanches são fresquinhos e super saborosos. Virrei cliente fiel! 💚', data: 'Há 2 dias' },
            { nome: 'João Pedro', avatar: 'J', estrelas: 5, texto: 'Melhor sanduíche natural que já comi! Ingredientes de qualidade e entrega rápida. Recomendo!', data: 'Há 1 semana' },
            { nome: 'Ana Costa', avatar: 'A', estrelas: 5, texto: 'Ótima opção para quem busca alimentação saudável sem perder o sabor. Adorei!', data: 'Há 3 dias' }
        ];
        
        container.innerHTML = depoimentosPadrao.map(dep => `
            <div class="depoimento-card">
                <div class="depoimento-estrelas">${'⭐'.repeat(dep.estrelas)}</div>
                <p class="depoimento-texto">${dep.texto}</p>
                <div class="depoimento-autor">
                    <div class="depoimento-avatar">${dep.avatar}</div>
                    <div class="depoimento-info">
                        <h4>${dep.nome}</h4>
                        <p>${dep.data}</p>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = depoimentos.filter(d => d.aprovado).map(dep => `
            <div class="depoimento-card">
                <div class="depoimento-estrelas">${'⭐'.repeat(dep.estrelas)}</div>
                <p class="depoimento-texto">${dep.texto}</p>
                <div class="depoimento-autor">
                    <div class="depoimento-avatar">${dep.nome.charAt(0).toUpperCase()}</div>
                    <div class="depoimento-info">
                        <h4>${dep.nome}</h4>
                        <p>${dep.data}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('modal-carrinho');
    if (event.target === modal) toggleCarrinho();
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar produtos padrão se não existirem no localStorage
    if (!localStorage.getItem('produtos')) {
        localStorage.setItem('produtos', JSON.stringify(getProdutos()));
    }
    
    // Inicializar cupons padrão
    if (!localStorage.getItem('cupons')) {
        const cuponsPadrao = {
            'PRIMEIRA10': { tipo: 'percentual', valor: 10, ativo: true, descricao: 'Primeira compra - 10% OFF' },
            'BEMVINDO': { tipo: 'fixo', valor: 5, ativo: true, descricao: 'Bem-vindo! R$ 5,00 OFF' }
        };
        localStorage.setItem('cupons', JSON.stringify(cuponsPadrao));
    }
    
    carregarProdutos();
    atualizarCarrinho();
    verificarHorario();
    carregarDepoimentos();
    
    // Atualizar horário a cada minuto
    setInterval(verificarHorario, 60000);
});

