from django.contrib import admin
from .models import Room, Building, Event

class BuildingAdmin(admin.ModelAdmin): 
    list_display = ('name_text', 'id_text') 

class RoomAdmin(admin.ModelAdmin): 
    list_display = ('room_num', 'building')

class EventAdmin(admin.ModelAdmin): 
    list_display = ('event_name', 'room', 'start_time', 'end_time') 

admin.site.register(Building, BuildingAdmin) 
admin.site.register(Room, RoomAdmin) 
admin.site.register(Event, EventAdmin) 