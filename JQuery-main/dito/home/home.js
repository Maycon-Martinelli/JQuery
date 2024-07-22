$(document).ready(function() {
    $('nav a').on('click', function(event) {
        event.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);
    });

    $('#reservation-form').on('submit', function(event) {
        event.preventDefault();
        alert('Reserva enviada com sucesso!');
        // Aqui você pode adicionar código para processar o formulário, como enviá-lo para um servidor
    });
});
