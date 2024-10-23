from django.db import models

class Team(models.Model):
    rollNo = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    position = models.CharField(max_length=50)
    phoneNo = models.IntegerField()
    emailId = models.EmailField()
    password = models.CharField()

class Event(models.Model):
    eventName = models.CharField(max_length=50, primary_key=True)
    eventVenue = models.CharField(max_length=100)
    eventTime = models.DateTimeField()
    eventId = models.AutoField()

class Attendees(models.Model):
    name = models.CharField(max_length=50)
    phoneNo = models.IntegerField()
    emailId = models.EmailField()
    ticketId = models.CharField(primary_key=True)
    accommodation = models.BooleanField()

class Competitions(models.Model):
    competitionName = models.CharField()
    prizeMoney = models.IntegerField()
    date = models.DateField()
    competitionId = models.AutoField(primary_key=True)

class Participants(models.Model):
    name = models.CharField(max_length=50)
    phoneNo = models.IntegerField()
    emailId = models.EmailField()
    registrationId = models.CharField(primary_key=True)
    accommodation = models.BooleanField()
    competitionId = models.ForeignKey(Competitions, on_delete=models.CASCADE)

class Speakers(models.Model):
    name = models.CharField()
    description = models.CharField()
    image = models.ImageField()

class Sponsors(models.Model):
    logo = models.ImageField()
    name = models.CharField(primary_key=True)
    sponsorshipAmount = models.IntegerField()
    dealBy = models.ForeignKey(Team, on_delete=models.DO_NOTHING)
    phoneNo = models.IntegerField()
    emailId = models.EmailField()