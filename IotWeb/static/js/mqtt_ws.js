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
    console.log(message)
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
        '<h5 class="card-title">Dispositivo: ' + message.device + '</h5>' +
        '<div class="dropdown m-2">' +
        '<button class="btn btn-secondary dropdown-toggle" type="button" id=dropdown-' + front_id + ' data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        'Estrategia' + '</button>' +
        '<div class="dropdown-menu" aria-labelledby="dropdown-' + front_id + '">' +
        '<a class="dropdown-item">Conservador</a>' +
        '<a class="dropdown-item">Moderado</a>' +
        '<a class="dropdown-item">Arriesgado</a>' +
        '</div >' +
        '</div >' +
        '<h6 class="card-title m-2">Consumo vivienda</h6>' +
        '<div class="row">' +
        '<div class="col-4 p-3">' +
        '<img src="/static/img/house.png" style="max-width: 100%;"></img>' +
        '</div>' +
        '<div class="col-4">' +
        '<div class="row">' +
        '<p class="card-text text-center" id=consumption-' + front_id + '></p>' +
        '</div>' +
        '<div class="row">' +
        '<div id=flow-' + front_id + '>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="col-4 p-3">' +
        '<img src="/static/img/tower.png" style="max-width: 100%;"></img>' +
        '</div>' +
        '</div>' +
        '<a  class="btn btn-primary send-config mt-2" data-id=' + front_id + '>Enviar configuración</a>' +
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
        $('#dropdown-' + front_id).removeClass('btn-secondary').addClass('btn-warning')
        payload = {
            'device': id_list[id],
            'field': 'mode-petition',
            'value': strategy_to_int[$('#dropdown-' + id).text()]
        }
        $('#dropdown-' + front_id).text('')
        console.log(payload)
        socket.send(JSON.stringify(payload))
    })
}

function add_data(message, front_id) {
    switch (message.field) {
        case 'mode':
            $('#dropdown-' + front_id).text(int_to_strategy[message.value])
            $('#dropdown-' + front_id).removeClass('btn-warning').addClass('btn-secondary')
            break;
        case 'consumption':
            $('#consumption-' + front_id).text(message.value + ' w')
            const valorDiv = $('#flow-' + front_id);

            if (message.value > 0) {
                valorDiv.removeClass().addClass('text-danger text-center').css({ 'display': 'block', 'width': '100%','font-size':'4em' }).html('&larr;');
                $('#consumption-' + front_id).removeClass().addClass('text-danger text-center')
            } else {
                valorDiv.removeClass().addClass('text-success text-center').css({ 'display': 'block', 'width': '100%','font-size':'4em' }).html('&rarr;');
                $('#consumption-' + front_id).removeClass().addClass('text-success text-center')
            }

            break;


    }
}

