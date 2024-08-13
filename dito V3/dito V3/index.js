$(document).ready(function () {
    // Quando o documento estiver pronto, execute a função

    $('nav a').on('click', function (event) {
        // Quando qualquer link dentro de 'nav' for clicado, execute a função
        event.preventDefault();
        // Impede que o comportamento padrão do link ocorra (não navega para a âncora)

        var target = $(this.getAttribute('href'));
        // Obtém o destino do link (âncora) usando o atributo 'href'

        if (target.length) {
            // Se o destino existir (não for nulo)

            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
                // Anima a rolagem suave até a posição do destino, com um deslocamento de 70px para cima
            }, 1000);
            // A animação ocorre ao longo de 1 segundo (1000ms)
        }
    });

    var orderItems = [];
    // Cria um array vazio para armazenar os itens do pedido

    $('#order-form').on('submit', function (event) {
        // Quando o formulário com id 'order-form' for enviado, execute a função
        event.preventDefault();
        // Impede o envio padrão do formulário (não recarrega a página)

        var name = $('#name').val();
        var email = $('#email').val();
        var item = $('#item').val();
        var quantity = $('#quantity').val();
        // Obtém os valores dos campos do formulário e armazena em variáveis

        var orderItem = {
            name: name,
            email: email,
            item: item,
            quantity: quantity
        };
        // Cria um objeto com as informações do item do pedido

        orderItems.push(orderItem);
        // Adiciona o objeto do item do pedido ao array 'orderItems'

        updateOrderSummary();
        // Atualiza o resumo do pedido na página

        $(this)[0].reset();
        // Reseta o formulário após o envio
    });

    function updateOrderSummary() {
        // Função para atualizar o resumo do pedido
        var orderSummary = $('#order-items');
        // Seleciona o elemento onde o resumo do pedido será exibido

        orderSummary.empty();
        // Limpa o conteúdo atual do resumo do pedido

        orderItems.forEach(function (orderItem, index) {
            // Para cada item no array 'orderItems', execute a função
            var itemHtml = `
                <p>${orderItem.item} (Quantidade: ${orderItem.quantity}) <span class="remove-item" data-index="${index}">&times;</span></p>
            `;
            // Cria o HTML para o item do pedido, incluindo um botão de remover

            orderSummary.append(itemHtml);
            // Adiciona o HTML do item ao resumo do pedido
        });

        $('.remove-item').on('click', function () {
            // Quando o botão de remover for clicado, execute a função
            var index = $(this).data('index');
            // Obtém o índice do item no array 'orderItems' através do atributo 'data-index'

            orderItems.splice(index, 1);
            // Remove o item do array 'orderItems' com base no índice

            updateOrderSummary();
            // Atualiza o resumo do pedido após a remoção do item
        });
    }

    $('#submit-order').on('click', function () {
        // Quando o botão de enviar pedido for clicado, execute a função
        if (orderItems.length > 0) {
            // Se houver itens no pedido
            alert('Pedido enviado com sucesso!');
            // Mostra um alerta indicando que o pedido foi enviado

            orderItems = [];
            // Reseta o array de itens do pedido

            updateOrderSummary();
            // Atualiza o resumo do pedido (limpando-o)
        } else {
            alert('Adicione itens ao seu pedido antes de enviar.');
            // Mostra um alerta caso o pedido esteja vazio
        }
    });
});

$(document).ready(function () {
    // Adiciona um item ao pedido quando o botão "Adicionar ao Pedido" é clicado
    $(".add-to-order").on("click", function () {
        // Obtém o nome do prato associado ao botão clicado
        const itemName = $(this).data("item");
        // Adiciona o prato selecionado à área de pedidos com uma opção para remover
        $("#order-items").append(`<p>${itemName} <span class="remove-item">[Remover]</span></p>`);
    });

    // Remove um item do pedido quando o usuário clica em "[Remover]"
    $("#order-items").on("click", ".remove-item", function () {
        // Remove o elemento pai (o <p> que contém o prato)
        $(this).parent().remove();
    });

    // Verifica e processa o envio do pedido
    $("#submit-order").on("click", function () {
        // Conta o número de itens atualmente na área de pedidos
        const orderItems = $("#order-items").children().length;

        // Se não houver itens no pedido, alerta o usuário
        if (orderItems === 0) {
            alert("Por favor, adicione algum item ao pedido antes de enviá-lo.");
        } else {
            // Se houver itens, envia o pedido e limpa a área de pedidos
            alert("Pedido enviado com sucesso!");
            $("#order-items").empty();
        }
    });
});

