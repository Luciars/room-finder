from django.db import models

class Building(models.Model):
    id_text = models.CharField(max_length=2, primary_key=True)
    name_text = models.CharField(max_length=200)

    def __str__(self):
        return self.name_text

class Room(models.Model):
    room_num = models.CharField(max_length=5)
    building = models.ForeignKey(Building, on_delete=models.CASCADE)

    def __str__(self):
        return "{}{}".format(self.building.id_text, self.room_num)

class Event(models.Model):
    event_name = models.CharField(max_length=300)
    start_time = models.TimeField()
    end_time = models.TimeField()
    room = models.ForeignKey(Room, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.event_name