from django.db import models
import uuid

class Team(models.Model):
    rollNo = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    position = models.CharField(max_length=50)
    phoneNo =  models.CharField(max_length=20)
    emailId = models.EmailField()
    password = models.CharField(max_length=500)
    instagramId = models.URLField()
    linkedinId = models.URLField()
    teamName = models.CharField(max_length=50)
    image = models.TextField()

class Event(models.Model):
    eventName = models.CharField(max_length=50)
    eventVenue = models.CharField(max_length=100)
    dayNo = models.IntegerField(choices=((1,1), (2,2), (3,3), (4,4)))
    eventDate = models.DateField()
    eventTime = models.TimeField()
    eventDesc = models.CharField(max_length=250)
    eventId = models.AutoField(primary_key=True)

class Attendees(models.Model):
    name = models.CharField(max_length=50)
    phoneNo = models.CharField(max_length=20)
    emailId = models.EmailField()
    ticketId = models.UUIDField(primary_key=True , editable=False, default=uuid.uuid4)
    accommodation = models.BooleanField()
    transactionId = models.CharField(max_length=100)

class Competitions(models.Model):
    competitionName = models.CharField(max_length=50)
    prizeMoney = models.IntegerField()
    date = models.DateField()
    poster = models.TextField()
    competitionId = models.AutoField(primary_key=True)

class Participants(models.Model):
    name = models.CharField(max_length=50)
    phoneNo = models.CharField(max_length=20)
    emailId = models.EmailField()
    registrationId = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    # accommodation = models.BooleanField()
    competitionId = models.ForeignKey(Competitions, on_delete=models.CASCADE)

class Speakers(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    image = models.TextField()

class Sponsors(models.Model):
    logo = models.TextField()
    name = models.CharField(primary_key=True, max_length=50)
    sponsorshipAmount = models.IntegerField()
    dealBy = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True)
    phoneNo = models.CharField(max_length=20)
    emailId = models.EmailField()
    title = models.CharField(max_length=80)
    link = models.URLField()

class Gallery(models.Model):
    image = models.TextField()
    imageId = models.AutoField(primary_key=True)