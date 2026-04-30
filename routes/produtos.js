const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const produtosPath = path.join(__dirname, '../data/produtos.json');

// Função para ler produtos do arquivo
function lerProdutos() {
    try {
        const data = fs.readFileSync(produtosPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Função para salvar produtos no arquivo
function salvarProdutos(produtos) {
    fs.writeFileSync(produtosPath, JSON.stringify(produtos, null, 2));
}

// GET /produtos - Listar todos os produtos
router.get('/', (req, res) => {
    const produtos = lerProdutos();
    res.json(produtos);
});

// GET /produtos/:id - Buscar produto por ID
router.get('/:id', (req, res) => {
    const produtos = lerProdutos();
    const produto = produtos.find(p => p.id == req.params.id);
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ erro: 'Produto não encontrado' });
    }
});

// POST /produtos - Cadastrar novo produto
router.post('/', (req, res) => {
    const produtos = lerProdutos();
    const novoProduto = req.body;
    novoProduto.id = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
    produtos.push(novoProduto);
    salvarProdutos(produtos);
    res.status(201).json(novoProduto);
});

// PUT /produtos/:id - Atualizar produto
router.put('/:id', (req, res) => {
    const produtos = lerProdutos();
    const index = produtos.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        const produtoAtualizado = { ...produtos[index], ...req.body };
        produtos[index] = produtoAtualizado;
        salvarProdutos(produtos);
        res.json(produtoAtualizado);
    } else {
        res.status(404).json({ erro: 'Falha ao atualizar produto' });
    }
});

// DELETE /produtos/:id - Remover produto
router.delete('/:id', (req, res) => {
    const produtos = lerProdutos();
    const index = produtos.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        const produtoRemovido = produtos.splice(index, 1);
        salvarProdutos(produtos);
        res.json(produtoRemovido);
    } else {
        res.status(404).json({ erro: 'Falha ao remover produto' });
    }
});

module.exports = router;
