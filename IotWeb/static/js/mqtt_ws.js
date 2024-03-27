var serverAddress = window.location.hostname;
var socket = new WebSocket('ws://' + serverAddress + ':8000/ws/mqtt/');


socket.onopen = function () {
    console.log('WebSocket mqtt connection established.');
};

var id_list = []
socket.onmessage = function (event) {
    var message = JSON.parse(event.data);
    console.log(message)
    if (id_list.includes(message.device)) {
        add_data(message)
    } else {
        id_list.push(message.device)
        create_html(message)
        add_data(message)
    }

}
var int_to_strategy = {
    0: 'Conservador',
    1: 'Moderado',
    2: 'Arriesgado'
}
var strategy_to_int = {
'Conservador':0,
'Moderado':1,
'Arriesgado':2
}
function create_html(message) {
    var html = '   <div class="col-lg-4 mb-4">' +
        '<div class="card">' +
        '<div class="card-body">' +
        '<h5 class="card-title">Dispositivo: ' + message.device + '</h5>' +
        '<div class="dropdown">' +
        '<button class="btn btn-secondary dropdown-toggle" type="button" id=dropdown-' + message.device + ' data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>' +
        '<div class="dropdown-menu" aria-labelledby="dropdown-' + message.device + '">' +
        '<a class="dropdown-item">Conservador</a>' +
        '<a class="dropdown-item">Moderado</a>' +
        '<a class="dropdown-item">Arriesgado</a>' +
        '</div >' +
        '</div >' +
        '<h6 class="card-title">Consumo vivienda</h6>' +
        '<p class="card-text" id=consumption-' + message.device + '></p>' +
        '<a  class="btn btn-primary send-config" data-id='+message.device+'>Enviar configuración</a>' +
        '</div>' +
        '</div>' +
        '</div>';
    var prev_html = $('#main-row').html();
    $('#main-row').html(prev_html + html);
    $('.dropdown-item').click(function () {
        let selectedOption = $(this).text();
        console.log(selectedOption)
        $(this).closest('.dropdown').find('.dropdown-toggle').text(selectedOption);

    });
    $('.send-config').on('click', function(){
        let id = $(this).data('id')
        payload = {
            'device': id ,
            'field':'config-petition',
            'value':strategy_to_int[$('#dropdown-'+id).text()]
        }
        socket.send(JSON.stringify(payload))
    })
}

function add_data(message) {
    switch (message.field) {
        case 'config':
            $('#dropdown-' + message.device).text(int_to_strategy[message.value])
            break;
        case 'consumption':
            $('#consumption-' + message.device).text(message.value +' w')

            break;


    }
}

