from django.db import models

class Building(models.Model):
    id_text = models.CharField(max_length=2, primary_key=True)
    name_text = models.CharField(max_length=200)

    def __str__(self):
        return self.name_text

class Room(models.Model):
    num_text = models.CharField(max_length=5)
    building = models.ForeignKey(Building, on_delete=models.CASCADE)

    def __str__(self):
        return self.building +  self.num_text