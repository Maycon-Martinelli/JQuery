$(document).ready(function() {
    $('nav a').on('click', function(event) {
        event.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    var orderItems = [];

    $('#order-form').on('submit', function(event) {
        event.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var item = $('#item').val();
        var quantity = $('#quantity').val();

        var orderItem = {
            name: name,
            email: email,
            item: item,
            quantity: quantity
        };

        orderItems.push(orderItem);
        updateOrderSummary();
        $(this)[0].reset();
    });

    function updateOrderSummary() {
        var orderSummary = $('#order-items');
        orderSummary.empty();
        orderItems.forEach(function(orderItem, index) {
            var itemHtml = `
                <p>${orderItem.item} (Quantidade: ${orderItem.quantity}) <span class="remove-item" data-index="${index}">&times;</span></p>
            `;
            orderSummary.append(itemHtml);
        });

        $('.remove-item').on('click', function() {
            var index = $(this).data('index');
            orderItems.splice(index, 1);
            updateOrderSummary();
        });
    }

    $('#submit-order').on('click', function() {
        if (orderItems.length > 0) {
            alert('Pedido enviado com sucesso!');
            orderItems = [];
            updateOrderSummary();
        } else {
            alert('Adicione itens ao seu pedido antes de enviar.');
        }
    });
});

$(document).ready(function() {
    $(".add-to-order").on("click", function() {
        const itemName = $(this).data("item");
        $("#order-items").append(`<p>${itemName} <span class="remove-item">[Remover]</span></p>`);
    });

    $("#order-items").on("click", ".remove-item", function() {
        $(this).parent().remove();
    });

    $("#submit-order").on("click", function() {
        alert("Pedido enviado com sucesso!");
        $("#order-items").empty();
    });
});
