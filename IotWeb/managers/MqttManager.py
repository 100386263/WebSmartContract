import json
import threading
import paho.mqtt.client as mqtt

class MQTTClient(threading.Thread):
    def __init__(self, websocket):
        super().__init__()
        self.mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
        self.mqttc.on_connect = self.on_connect
        self.mqttc.on_message = self.on_message
        self.websocket = websocket
        self.running = False

    def run(self):
        self.mqttc.connect("192.168.0.35", 1883, 60)
        self.mqttc.subscribe("+/mode")
        self.mqttc.subscribe("+/consumption")
        self.mqttc.subscribe("+/production")
        while not self.running:  # Mientras el evento de ejecución esté activo
            self.mqttc.loop(timeout=1.0)


    def on_connect(self, client, userdata, flags, reason_code, properties):
        print(f"Connected with result code {reason_code}")

    def on_message(self, client, userdata, msg):
        print(msg.topic + " " + str(msg.payload))
        # Envía el payload a través del websocket
        split_topic = msg.topic.split('/')
        payload = {
            'device': split_topic[0],
            'field': split_topic[1],
            'value': int(msg.payload.decode('utf-8'))
        }
        self.websocket.send(json.dumps(payload))
        
    def stop(self):
        self.running = True
        self.mqttc.disconnect()  # Desconecta el cliente MQTT


