# consumers.py

from channels.generic.websocket import WebsocketConsumer
import paho.mqtt.client as mqtt
from ..managers.MqttManager import MQTTClient




class MQTTListenerConsumer(WebsocketConsumer):

    def connect(self):
        '''Connect Ws stream'''
        self.accept()
        self.mqttClient = MQTTClient(self)
        self.mqttClient.start()

    def disconnect(self, code):
        '''Disconnect ws stream'''
        self.mqttClient.stop()
        self.mqttClient.join()

    def receive(self, text_data):
        '''Receive data from ws'''
        pass
