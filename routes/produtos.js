var express = require('express');
var router = express.Router();

router.post('/produtos/insert', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header("Access-Control-Allow-Headers", "accept, content-type");
    res.header("Access-Control-Max-Age", "1728000");
    res.status(200);
    res.send(req.body);
});

router.get('/produtos/list', function (req, res, next) {
    var produtos = [
        {
            "id": 1,
            "nome": "Coca-Cola",
            "qtd": {
                "caixa": 12,
                "unidade": 144
            },
            "preco": {
                "unidade": 2.50,
                "caixa": 5.00
            },
            "ultima_encomenda": {
                "data": "01/01/2018",
                "fornecedor": "Coca-Cola",
                "quantidade": {
                    "caixa": 12,
                },
                "valor": {
                    "total": 60.00,
                    "caixa": 5.00
                }
            }
        },
        {
            "id": 2,
            "nome": "Fanta",
            "qtd": {
                "caixa": 12,
                "unidade": 144
            },
            "preco": {
                "unidade": 2.50,
                "caixa": 5.00
            },
            "ultima_encomenda": {
                "data": "01/01/2018",
                "fornecedor": "Fanta",
                "quantidade": {
                    "caixa": 12,
                },
                "valor": {
                    "total": 60.00,
                    "caixa": 5.00
                }
            }
        },
        {
            "id": 3,
            "nome": "Sprite",
            "qtd": {
                "caixa": 12,
                "unidade": 144
            },
            "preco": {
                "unidade": 2.50,
                "caixa": 5.00
            },
            "ultima_encomenda": {
                "data": "01/01/2018",
                "fornecedor": "Sprite",
                "quantidade": {
                    "caixa": 12,
                },
                "valor": {
                    "total": 60.00,
                    "caixa": 5.00
                }
            }
        },
    ];
    res.render("list", {
        title: "Lista de produtos",
        produtos: produtos
    });
})

module.exports = router;