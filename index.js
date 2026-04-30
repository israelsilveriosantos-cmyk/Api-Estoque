const express = require ('express');
const RotasProdutos = require ('./routes/produtos');
const app = express ();
const port = 3000;
app.use(express.json());
app.use('/produtos',RotasProdutos);
app.get('/',(req,res) => {
    res.json({
        mensagem:'API de estoque rodando',
        endpoints: {
            listartodos:'get/produtos',
            buscarponto: 'get/produtos/:id',
            cadastrar: 'post/produtos',
            atualizar: 'put/produtos/:id',
            remover: 'delete/produto/:id'
        }
    });
});
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`);
    })
