$(document).ready(function() {
    $('nav a[href*="#"]').on('click', function(event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
            }
        }
    });

    $('#reservation-form').on('submit', function(event) {
        event.preventDefault();
        alert('Reserva enviada com sucesso!');
    });

    $('#order-form').on('submit', function(event) {
        event.preventDefault();
        alert('Pedido enviado com sucesso!');
    });
});
