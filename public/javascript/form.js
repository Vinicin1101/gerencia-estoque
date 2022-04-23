$('document').ready(function () {
    $('button#btn_insert').click(function () {

        let prod = $('#nome_produto').val();
        let num_caixas = $('#num_caixas').val();
        let nomeForn = $('#fornecedor').val();
        let dataForn = $('#data_forn').val();
        let valor = Number($('#valor').val());

        if (prod.trim() == '' || num_caixas == '' || nomeForn.trim() == '' || dataForn == '' || valor == '') {
            alert('Preencha todos os campos!');
        } else {
            let produto = jsonProduto(prod, num_caixas, nomeForn, dataForn, valor);

            $.ajax({
                url: 'http://localhost:3000/produtos/insert',
                type: 'POST',
                data: produto,
                success: function (data) {
                    alert("Produto inserido com sucesso!");
                    $('#nome_produto').val('');
                    $('#num_caixas').val('');
                    $('#fornecedor').val('');
                    $('#data_forn').val('');
                    $('#valor').val('');

                    console.log(data);
                }
            });
        }
    });

    function jsonProduto(prod, num_caixas, nomeForn, dataForn, valor) {
        let produto = {
            "prod": prod,
            "qtd": {
                "caixa": num_caixas.toString(),
                "unidade": (num_caixas * 12).toString()
            },
            "preco": {
                "unidade": (((valor / num_caixas) * 12) * 2).toFixed(2),
                "caixa": ((valor / num_caixas) * 2).toFixed(2)
            },
            "ultima_encomenda": {
                "data": dataForn,
                "fornecedor": nomeForn,
                "quantidade": {
                    "caixa": num_caixas.toString()
                },
                "valor": {
                    "total": valor.toFixed(2),
                    "caixa": (valor / num_caixas).toFixed(2)
                }
            }
        }

        return produto;
    }


});