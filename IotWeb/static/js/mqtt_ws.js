var serverAddress = window.location.hostname;
var socketActivity = new WebSocket('ws://' + serverAddress + ':8000/ws/mqtt/');


socketActivity.onopen = function () {
    console.log('WebSocket mqtt connection established.');
};

socketActivity.onmessage = function (event) {
    var message = JSON.parse(event.data);
    console.log(message);

}  