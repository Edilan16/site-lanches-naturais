// Senha de acesso (você pode mudar aqui)
const SENHA_ADMIN = 'admin123';

// Carregar produtos do localStorage ou usar padrão
function carregarProdutosAdmin() {
    const produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
        return JSON.parse(produtosSalvos);
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

// Salvar produtos no localStorage
function salvarProdutos(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
    alert('✅ Produtos salvos com sucesso!');
    renderizarProdutos();
}

// Login
function fazerLogin() {
    const senha = document.getElementById('senha-admin').value;
    if (senha === SENHA_ADMIN) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        renderizarProdutos();
    } else {
        alert('❌ Senha incorreta!');
    }
}

// Sair
function sair() {
    document.getElementById('login-screen').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('senha-admin').value = '';
}

// Renderizar lista de produtos
function renderizarProdutos() {
    const produtos = carregarProdutosAdmin();
    const container = document.getElementById('produtos-lista');
    
    if (produtos.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #6b7280;">Nenhum produto cadastrado ainda.</p>';
        return;
    }
    
    container.innerHTML = produtos.map(produto => `
        <div class="product-card ${produto.disponivel ? '' : 'indisponivel'}">
            <div class="product-header">
                <h3>${produto.nome}</h3>
                <span class="status-badge ${produto.disponivel ? 'disponivel' : 'indisponivel'}">
                    ${produto.disponivel ? '✓ Disponível' : '✕ Indisponível'}
                </span>
            </div>
            <div class="product-info">
                <p>${produto.descricao}</p>
                <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
            </div>
            <div class="product-actions">
                <button class="btn btn-warning" onclick="editarProduto(${produto.id})">Editar</button>
                <button class="btn ${produto.disponivel ? 'btn-secondary' : 'btn-success'}" 
                        onclick="toggleDisponibilidade(${produto.id})" style="font-size: 12px; padding: 8px 16px;">
                    ${produto.disponivel ? 'Indisponibilizar' : 'Disponibilizar'}
                </button>
                <button class="btn btn-danger" onclick="removerProduto(${produto.id})">Remover</button>
            </div>
        </div>
    `).join('');
}

// Adicionar produto
function adicionarProduto(event) {
    event.preventDefault();
    
    const produtos = carregarProdutosAdmin();
    const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
    
    const novoProduto = {
        id: novoId,
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        preco: parseFloat(document.getElementById('preco').value),
        imagem: document.getElementById('imagem').value || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        disponivel: true
    };
    
    produtos.push(novoProduto);
    salvarProdutos(produtos);
    
    // Limpar formulário
    document.getElementById('form-produto').reset();
}

// Editar produto
function editarProduto(id) {
    const produtos = carregarProdutosAdmin();
    const produto = produtos.find(p => p.id === id);
    
    if (produto) {
        document.getElementById('edit-id').value = produto.id;
        document.getElementById('edit-nome').value = produto.nome;
        document.getElementById('edit-descricao').value = produto.descricao;
        document.getElementById('edit-preco').value = produto.preco;
        document.getElementById('edit-imagem').value = produto.imagem;
        
        document.getElementById('modal-editar').style.display = 'block';
    }
}

// Salvar edição
function salvarEdicao(event) {
    event.preventDefault();
    
    const produtos = carregarProdutosAdmin();
    const id = parseInt(document.getElementById('edit-id').value);
    const index = produtos.findIndex(p => p.id === id);
    
    if (index !== -1) {
        produtos[index] = {
            ...produtos[index],
            nome: document.getElementById('edit-nome').value,
            descricao: document.getElementById('edit-descricao').value,
            preco: parseFloat(document.getElementById('edit-preco').value),
            imagem: document.getElementById('edit-imagem').value
        };
        
        salvarProdutos(produtos);
        fecharModal();
    }
}

// Toggle disponibilidade
function toggleDisponibilidade(id) {
    const produtos = carregarProdutosAdmin();
    const produto = produtos.find(p => p.id === id);
    
    if (produto) {
        produto.disponivel = !produto.disponivel;
        salvarProdutos(produtos);
    }
}

// Remover produto
function removerProduto(id) {
    if (confirm('⚠️ Tem certeza que deseja remover este produto?')) {
        let produtos = carregarProdutosAdmin();
        produtos = produtos.filter(p => p.id !== id);
        salvarProdutos(produtos);
    }
}

// Fechar modal
function fecharModal() {
    document.getElementById('modal-editar').style.display = 'none';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modal-editar');
    if (event.target === modal) {
        fecharModal();
    }
}

// Controle de Abas
function mostrarAba(aba) {
    document.getElementById('aba-produtos').style.display = aba === 'produtos' ? 'block' : 'none';
    document.getElementById('aba-configuracoes').style.display = aba === 'configuracoes' ? 'block' : 'none';
    
    if (aba === 'configuracoes') {
        carregarConfiguracoes();
    }
}

// Toggle Status da Loja
function toggleLojaAberta() {
    const checkbox = document.getElementById('loja-aberta');
    const status = document.getElementById('status-atual');
    
    localStorage.setItem('loja_aberta', checkbox.checked);
    
    if (checkbox.checked) {
        status.style.background = '#d1fae5';
        status.style.color = '#065f46';
        status.textContent = '✅ Loja ABERTA - Aceitando pedidos';
    } else {
        status.style.background = '#fee2e2';
        status.style.color = '#991b1b';
        status.textContent = '⛔ Loja FECHADA - Não aceitando pedidos';
    }
}

// Salvar Horários
function salvarHorarios(event) {
    event.preventDefault();
    
    const config = {
        seg_sex: document.getElementById('horario-seg-sex').value,
        sab: document.getElementById('horario-sab').value,
        dom: document.getElementById('horario-dom').value
    };
    
    localStorage.setItem('config_horario', JSON.stringify(config));
    alert('✅ Horários salvos com sucesso!');
}

// Adicionar Cupom
function adicionarCupom(event) {
    event.preventDefault();
    
    const codigo = document.getElementById('cupom-codigo').value.toUpperCase();
    const tipo = document.getElementById('cupom-tipo').value;
    const valor = parseFloat(document.getElementById('cupom-valor').value);
    const descricao = document.getElementById('cupom-descricao').value;
    
    const cupons = JSON.parse(localStorage.getItem('cupons') || '{}');
    
    cupons[codigo] = {
        tipo: tipo,
        valor: valor,
        descricao: descricao,
        ativo: true
    };
    
    localStorage.setItem('cupons', JSON.stringify(cupons));
    document.getElementById('form-cupom').reset();
    carregarCupons();
    alert(`✅ Cupom ${codigo} criado com sucesso!`);
}

// Remover Cupom
function removerCupom(codigo) {
    if (confirm(`Deseja remover o cupom ${codigo}?`)) {
        const cupons = JSON.parse(localStorage.getItem('cupons') || '{}');
        delete cupons[codigo];
        localStorage.setItem('cupons', JSON.stringify(cupons));
        carregarCupons();
    }
}

// Toggle Cupom Ativo
function toggleCupomAtivo(codigo) {
    const cupons = JSON.parse(localStorage.getItem('cupons') || '{}');
    if (cupons[codigo]) {
        cupons[codigo].ativo = !cupons[codigo].ativo;
        localStorage.setItem('cupons', JSON.stringify(cupons));
        carregarCupons();
    }
}

// Carregar Cupons
function carregarCupons() {
    const cupons = JSON.parse(localStorage.getItem('cupons') || '{}');
    const container = document.getElementById('cupons-lista');
    
    if (Object.keys(cupons).length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #6b7280;">Nenhum cupom cadastrado</p>';
        return;
    }
    
    container.innerHTML = Object.keys(cupons).map(codigo => {
        const cupom = cupons[codigo];
        return `
            <div class="product-card" style="margin-bottom: 15px;">
                <div class="product-header">
                    <h3>${codigo}</h3>
                    <span class="status-badge ${cupom.ativo ? 'disponivel' : 'indisponivel'}">
                        ${cupom.ativo ? '✓ Ativo' : '✕ Inativo'}
                    </span>
                </div>
                <p style="color: #6b7280; margin: 10px 0;">${cupom.descricao}</p>
                <p style="font-weight: 700; color: #667eea; margin-bottom: 15px;">
                    ${cupom.tipo === 'percentual' ? cupom.valor + '%' : 'R$ ' + cupom.valor.toFixed(2)} de desconto
                </p>
                <div class="product-actions">
                    <button class="btn ${cupom.ativo ? 'btn-secondary' : 'btn-success'}" 
                            onclick="toggleCupomAtivo('${codigo}')" style="font-size: 12px;">
                        ${cupom.ativo ? 'Desativar' : 'Ativar'}
                    </button>
                    <button class="btn btn-danger" onclick="removerCupom('${codigo}')">Remover</button>
                </div>
            </div>
        `;
    }).join('');
}

// Carregar Configurações
function carregarConfiguracoes() {
    // Status da Loja
    const lojaAberta = localStorage.getItem('loja_aberta') !== 'false';
    document.getElementById('loja-aberta').checked = lojaAberta;
    toggleLojaAberta();
    
    // Horários
    const config = JSON.parse(localStorage.getItem('config_horario') || '{"seg_sex":"08:00-18:00","sab":"08:00-14:00","dom":"fechado"}');
    document.getElementById('horario-seg-sex').value = config.seg_sex;
    document.getElementById('horario-sab').value = config.sab;
    document.getElementById('horario-dom').value = config.dom;
    
    // Cupons
    carregarCupons();
}

// Inicializar produtos padrão se não existirem
if (!localStorage.getItem('produtos')) {
    localStorage.setItem('produtos', JSON.stringify(carregarProdutosAdmin()));
}

