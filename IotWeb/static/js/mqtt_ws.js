var serverAddress = window.location.hostname;
var socket = new WebSocket('ws://' + serverAddress + ':8000/ws/mqtt/');


socket.onopen = function () {
    console.log('WebSocket mqtt connection established.');
};

var front_id = 1;
var id_list = {}

function find_key_value(objeto, valor) {
    return Object.keys(objeto).find(key => objeto[key] === valor);
}
socket.onmessage = function (event) {
    var message = JSON.parse(event.data);
    var find_id = find_key_value(id_list, message.device)
    if (find_id != undefined) {

        add_data(message, find_id)
    } else {
        id_list[front_id] = message.device
        create_html(message, front_id)
        add_data(message, front_id)
        front_id += 1;
    }

}
var int_to_strategy = {
    0: 'Conservador',
    1: 'Moderado',
    2: 'Arriesgado'
}
var strategy_to_int = {
    'Conservador': 0,
    'Moderado': 1,
    'Arriesgado': 2
}
function create_html(message, front_id) {
    var html = '   <div class="col-lg-4 mb-4">' +
        '<div class="card">' +
        '<div class="card-body">' +
        '<h5 class="card-title">Dispositivo: ' + front_id + '</h5>' +
        '<div class="dropdown">' +
        '<button class="btn btn-secondary dropdown-toggle" type="button" id=dropdown-' + front_id + ' data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>' +
        '<div class="dropdown-menu" aria-labelledby="dropdown-' + front_id + '">' +
        '<a class="dropdown-item">Conservador</a>' +
        '<a class="dropdown-item">Moderado</a>' +
        '<a class="dropdown-item">Arriesgado</a>' +
        '</div >' +
        '</div >' +
        '<h6 class="card-title">Consumo vivienda</h6>' +
        '<p class="card-text" id=consumption-' + front_id + '></p>' +
        '<a  class="btn btn-primary send-config" data-id=' + front_id + '>Enviar configuración</a>' +
        '</div>' +
        '</div>' +
        '</div>';
    var prev_html = $('#main-row').html();
    $('#main-row').html(prev_html + html);
    $('.dropdown-item').click(function () {
        let selectedOption = $(this).text();
        $(this).closest('.dropdown').find('.dropdown-toggle').text(selectedOption);

    });
    $('.send-config').on('click', function () {
        let id = $(this).data('id')
        payload = {
            'device': id_list[id],
            'field': 'mode-petition',
            'value': strategy_to_int[$('#dropdown-' + id).text()]
        }
        socket.send(JSON.stringify(payload))
    })
}

function add_data(message, front_id) {
    switch (message.field) {
        case 'mode':
            $('#dropdown-' + front_id).text(int_to_strategy[message.value])
            break;
        case 'consumption':
            $('#consumption-' + front_id).text(message.value + ' w')

            break;


    }
}

