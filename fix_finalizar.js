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
    mensagem += `\nÌ≤∞ *Subtotal: R$ ${total.toFixed(2)}*`;
    
    // Aplicar desconto se houver cupom
    let totalFinal = total;
    if (cupomAtual) {
        let desconto = 0;
        if (cupomAtual.tipo === 'percentual') {
            desconto = total * (cupomAtual.valor / 100);
        } else {
            desconto = cupomAtual.valor;
        }
        totalFinal = Math.max(0, total - desconto);
        mensagem += `\nÌæüÔ∏è *Desconto: -R$ ${desconto.toFixed(2)}*`;
        mensagem += `\nÌ≤µ *Total com desconto: R$ ${totalFinal.toFixed(2)}*`;
    }
    
    // Verifica frete gr√°tis
    if (totalFinal >= 30) {
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
    cupomAtual = null;
    document.getElementById('observacoes').value = '';
    document.getElementById('cupom').value = '';
    const mensagemCupom = document.getElementById('cupom-mensagem');
    if (mensagemCupom) {
        mensagemCupom.style.display = 'none';
    }
    atualizarCarrinho();
    toggleCarrinho();
}
