# 🔧 Guia do Painel Administrativo

## Como Acessar

1. No rodapé do site, clique em **"Painel Admin"**
2. Digite a senha: `admin123`
3. Clique em **Entrar**

## 🔑 Como Mudar a Senha

Para alterar a senha de acesso:

1. Abra o arquivo `admin.js`
2. Na primeira linha, altere:
   ```javascript
   const SENHA_ADMIN = 'admin123'; // Troque por sua senha
   ```

## ✨ Funcionalidades

### 1️⃣ Adicionar Novo Produto

- Preencha o formulário no topo:
  - **Nome**: Ex: "Sanduíche de Frango"
  - **Preço**: Ex: 12.50
  - **Descrição**: Ingredientes do produto
  - **URL da Imagem**: Link do Unsplash (opcional)
- Clique em **"Adicionar Produto"**

### 2️⃣ Editar Produto Existente

- Clique no botão **"Editar"** no produto
- Altere os dados desejados
- Clique em **"Salvar Alterações"**

### 3️⃣ Marcar como Indisponível

- Útil quando um produto acabou temporariamente
- Clique em **"Indisponibilizar"**
- O produto desaparece do site, mas fica salvo
- Para disponibilizar novamente, clique em **"Disponibilizar"**

### 4️⃣ Remover Produto

- Clique em **"Remover"**
- Confirme a exclusão
- ⚠️ **Atenção**: Esta ação não pode ser desfeita!

### 5️⃣ Buscar Imagens no Unsplash

1. Acesse: https://unsplash.com/
2. Busque pela imagem (ex: "sandwich", "juice")
3. Clique na imagem desejada
4. Clique com botão direito > **"Copiar endereço da imagem"**
5. Cole no campo "URL da Imagem"

**Dica**: Adicione `?w=400&h=300&fit=crop` no final da URL para otimizar o tamanho

Exemplo:
```
https://images.unsplash.com/photo-1234567890?w=400&h=300&fit=crop
```

## 💾 Como Funciona

- Todos os produtos são salvos no **navegador** (localStorage)
- Os dados ficam salvos mesmo fechando o navegador
- Se limpar o cache do navegador, os dados voltam ao padrão
- Cada navegador tem seus próprios dados (Chrome, Firefox, etc.)

## 🔄 Sincronização entre Dispositivos

**Atenção**: O localStorage salva apenas no navegador atual.

Para sincronizar produtos entre diferentes dispositivos, você precisaria:
- Usar um banco de dados online (Firebase, Supabase)
- Ou exportar/importar manualmente

## ❓ Problemas Comuns

### Produtos não aparecem no site
- Verifique se está marcado como **"Disponível"**
- Atualize a página principal (F5)

### Perdi todos os produtos
- Verifique se limpou o cache do navegador
- Os produtos padrão voltarão automaticamente

### Senha não funciona
- Certifique-se de estar usando: `admin123`
- Verifique se alterou o arquivo `admin.js`

## 📱 Acesso Pelo Celular

O painel funciona em qualquer dispositivo:
- Abra o site no celular
- Role até o rodapé
- Clique em "Painel Admin"
- Use a mesma senha

---

**Precisa de ajuda?** Entre em contato pelo WhatsApp! 📞
