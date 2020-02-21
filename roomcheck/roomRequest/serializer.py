from rest_framework import serializers
from .models import Room, Building, Event

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['pk', 'room_num', 'building', 'room_name']

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ('id_text', 'name_text')

class EventViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['room_name', 'room', 'event_name', 'start_time', 'end_time']

class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['room']