# routing.py

from django.urls import path
from .consumers.MqttListenerConsumer import MQTTListenerConsumer

websocket_urlpatterns = [
    path('ws/mqtt/', MQTTListenerConsumer.as_asgi()),
]
