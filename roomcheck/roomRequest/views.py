from rest_framework import viewsets, status
from django.http import QueryDict
from rest_framework.response import Response
from .serializer import RoomSerializer, BuildingSerializer, EventCreateSerializer, EventViewSerializer
from .models import Room, Building, Event
from .scraper import *

class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()

class BuildingView(viewsets.ModelViewSet):
    serializer_class = BuildingSerializer
    queryset = Building.objects.all()
    http_method_names = ['get', 'post', 'patch', 'delete']

class EventView(viewsets.ModelViewSet):
    serializer_class = EventCreateSerializer
    queryset = Event.objects.all()
    http_method_names = ['get', 'post', 'delete']

    def create(self, request):
        print(request.data)
        room_id = request.data.get('room')

        room = Room.objects.all().get(pk=room_id)
        building = Building.objects.all().get(pk=room.building.id_text)

        eventData = getEvents(building.id_text, room.room_num)

        def sendRequests(data):
            serializer = self.serializer_class(data=data)
            if serializer.is_valid():
                newEvent = Event(room = room, start_time = data.get('start_time'), \
                    end_time = data.get('end_time'), event_name = data.get('event_name'))
                if not Event.objects.filter(room = room, start_time = data.get('start_time')).exists():
                    newEvent.save()
                else:
                    return Response(data, status=status.HTTP_409_CONFLICT)
                return Response(data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        summary = QueryDict('', mutable=True)
        summary.update({
            "events written": len(eventData)
        })
        remainingEvents = len(eventData)
        
        if (remainingEvents == 0):
            return Response(summary, status=status.HTTP_204_NO_CONTENT)

        while remainingEvents > 0:
            data = request.data.copy()
            data.update(eventData[remainingEvents-1])
            remainingEvents -= 1
            sendRequests(data)
        
        return Response(summary, status=status.HTTP_201_CREATED)

    def list(self, requests):
        queryset = Event.objects.all()
        serializer = EventViewSerializer(queryset, many=True)
        return Response(serializer.data)
