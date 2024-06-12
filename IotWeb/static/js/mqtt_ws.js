var serverAddress = window.location.hostname;
var socket = new WebSocket('ws://' + serverAddress + ':8000/ws/mqtt/');


socket.onopen = function () {
    console.log('WebSocket mqtt connection established.');
};

var front_id = 1;
var id_list = {}
var consumption = 0;
var production = 0;

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
        '<form>' +
        '<label for=buy-price-' + front_id + '>Precio maximo de compra:</label>' +
        '<input type="number" id=buy-price-' + front_id + ' name=buy-price-' + front_id + ' step="0.01" placeholder="0.00">' +
        '</form>' +
        '<form>' +
        '<label for=sell-price-' + front_id + '>Precio minimo     de    venta:&nbsp;&nbsp;&nbsp;</label>' +
        '<input type="number" id=sell-price-' + front_id + ' name=sell-price-' + front_id + ' step="0.01" placeholder="0.00">' +
        '</form>' +
        '</div >' +
        '<h6 class="card-title m-2">Consumo vivienda</h6>' +
        '<div class="row">' +
        '<div class="col-4">' +
        '<div class="row">' +
        '<p class="card-text text-center" id=solar-to-house-' + front_id + '></p>' +
        '</div>' +
        '<div class="row">' +
        '<div id=flow-solar-to-house-' + front_id + '>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="col-4">' +
        '<div class="row">' +
        '<p class="card-text text-center" id=production-' + front_id + '></p>' +
        '</div>' +
        '<div class="row">' +
        '<img src="/static/img/solar.png" style="max-width: 100%;"></img>' +
        '</div>' +
        '</div>' +
        '<div class="col-4">' +
        '<div class="row">' +
        '<p class="card-text text-center" id=solar-to-grid-' + front_id + '></p>' +
        '</div>' +
        '<div class="row">' +
        '<div id=flow-solar-to-grid-' + front_id + '>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-4 p-3">' +
        '<div class="row">' +
        '<img src="/static/img/house.png" style="max-width: 100%;"></img>' +
        '</div>' +
        '<div class="row">' +
        '<p class="card-text text-center" id=consumption-' + front_id + '></p>' +
        '</div>' +
        '</div>' +
        '<div class="col-4">' +
        '<div class="row pt-3">' +
        '<div id=flow-grid-to-house-' + front_id + '>' +
        '</div>' +
        '<p class="card-text text-center" id=grid-to-house-' + front_id + '></p>' +
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
        if (strategy_to_int[$('#dropdown-' + id).text()] != undefined && $('#sell-price-' + id).val() != 0.00 && $('#buy-price-' + id).val() != 0.00) {
            
            $('#dropdown-' + front_id).removeClass('btn-secondary').addClass('btn-warning')
            payload = {
                'device': id_list[id],
                'field': 'mode-petition',
                'value': strategy_to_int[$('#dropdown-' + id).text()]
            }
            $('#dropdown-' + front_id).text('')
            console.log(payload)
            socket.send(JSON.stringify(payload))
            payload = {
                'device': id_list[id],
                'field': 'buy-price',
                'value': $('#buy-price-' + id).val(),
            }
            $('#dropdown-' + front_id).text('')
            console.log(payload)
            socket.send(JSON.stringify(payload))
            payload = {
                'device': id_list[id],
                'field': 'sell-price',
                'value': $('#sell-price-' + id).val(),
            }
            $('#dropdown-' + front_id).text('')
            console.log(payload)
            socket.send(JSON.stringify(payload))
        }

    })
}

function add_data(message, front_id) {
    switch (message.field) {
        case 'mode':
            $('#dropdown-' + front_id).text(int_to_strategy[message.value])
            $('#dropdown-' + front_id).removeClass('btn-warning').addClass('btn-secondary')
            break;
        case 'consumption':
            consumption = message.value;


            break;
        case 'production':
            production = message.value;

            break;


    }
    drawEnergyFlow(front_id)
}

function drawEnergyFlow(front_id) {

    var difference = production - consumption
    console.log('Production: ', difference)
    const flow_grid_to_house = $('#flow-grid-to-house-' + front_id);
    const flow_solar_to_grid = $('#flow-solar-to-grid-' + front_id);
    const flow_solar_to_house = $('#flow-solar-to-house-' + front_id);
    flow_solar_to_house.removeClass().addClass('text-success text-center').css({ 'display': 'block', 'width': '100%', 'font-size': '4em' }).html('&larr;');
    flow_solar_to_house.css({
        "-webkit-transform": "rotate(-45deg)",

    });
    $('#consumption-' + front_id).text(consumption + ' w')
    $('#production-' + front_id).text(production + ' w')

    if (difference < 0) {
        $('#grid-to-house-' + front_id).text(- difference + ' w')
        $('#solar-to-house-' + front_id).text(production + ' w').addClass('text-success text-center')
        $('#solar-to-grid-' + front_id).text('')
        flow_solar_to_grid.removeClass().empty()
        $('#grid-to-house-' + front_id).removeClass().addClass('text-danger text-center')
        flow_grid_to_house.removeClass().addClass('text-danger text-center').css({ 'display': 'block', 'width': '100%', 'font-size': '4em' }).html('&larr;');
    } else {
        $('#grid-to-house-' + front_id).text('')
        flow_grid_to_house.removeClass().empty()
        $('#solar-to-house-' + front_id).text(consumption + ' w').addClass('text-success text-center')

        $('#solar-to-grid-' + front_id).text(difference + ' w').addClass('text-success text-center')
        flow_solar_to_grid.removeClass().addClass('text-success text-center').css({ 'display': 'block', 'width': '100%', 'font-size': '4em' }).html('&rarr;');
        flow_solar_to_grid.css({
            "-webkit-transform": "rotate(45deg)",

        });


    }
    if (production == 0) {
        flow_solar_to_house.removeClass().empty()
        $('#solar-to-house-' + front_id).text('')
    }
}