from django.shortcuts import render
from rest_framework import viewsets
from .serializer import RoomSerializer, BuildingSerializer
from .models import Room, Building, Event

# Create your views here.
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world")

class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()

class BuildingView(viewsets.ModelViewSet):
    serializer_class = BuildingSerializer
    queryset = Building.objects.all()