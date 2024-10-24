from django.db import models

class Team(models.Model):
    rollNo = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    position = models.CharField(max_length=50)
    phoneNo =  models.CharField(max_length=20)
    emailId = models.EmailField()
    password = models.CharField(max_length=500)

class Event(models.Model):
    eventName = models.CharField(max_length=50)
    eventVenue = models.CharField(max_length=100)
    eventTime = models.DateTimeField()
    eventId = models.AutoField(primary_key=True)

class Attendees(models.Model):
    name = models.CharField(max_length=50)
    phoneNo = models.CharField(max_length=20)
    emailId = models.EmailField()
    ticketId = models.UUIDField(primary_key=True, editable=False)
    accommodation = models.BooleanField()

class Competitions(models.Model):
    competitionName = models.CharField(max_length=50)
    prizeMoney = models.IntegerField()
    date = models.DateField()
    competitionId = models.AutoField(primary_key=True)

class Participants(models.Model):
    name = models.CharField(max_length=50)
    phoneNo = models.CharField(max_length=20)
    emailId = models.EmailField()
    registrationId = models.UUIDField(primary_key=True, editable=False)
    accommodation = models.BooleanField()
    competitionId = models.ForeignKey(Competitions, on_delete=models.CASCADE)

class Speakers(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    image = models.TextField()

class Sponsors(models.Model):
    logo = models.ImageField()
    name = models.CharField(primary_key=True, max_length=50)
    sponsorshipAmount = models.IntegerField()
    dealBy = models.ForeignKey(Team, on_delete=models.DO_NOTHING)
    phoneNo = models.CharField(max_length=20)
    emailId = models.EmailField()