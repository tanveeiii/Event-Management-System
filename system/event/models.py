from django.db import models

# Create your models here.

class Team(models.Model):
    rollNo = models.IntegerField()
    name = models.CharField(max_length=50)
    position = models.CharField(max_length=50)
    phoneNo = models.BigIntegerField()
    emailId = models.EmailField()



