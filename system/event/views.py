from django.shortcuts import render
from .models import Speakers, Competitions, Team
from django.db import connection, transaction
from django.http import JsonResponse
import json
import uuid
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@csrf_exempt
def competitions(request):
    if(request.method=="GET"):
        query = "select * from event_competitions"
        competitions_list=[]
        with connection.cursor() as cursor:
            cursor.execute(query)
            competitions_list=cursor.fetchall()
        competitions_data = []
        for competition in competitions_list:
            competitions_data.append({"name": competition[0], "prizeMoney": competition[1], "date": competition[2], "id": competition[3]})
        return JsonResponse(competitions_data, safe=False)
    if(request.method=="POST"):
        data = json.loads(request.body)
        name = data['name']
        prizeMoney = data['prizeMoney']
        date = data['date']
        query = """
                    insert into event_competitions(competitionName, prizeMoney, date) values (%s,%s,%s)
                """
        with connection.cursor() as cursor:
            cursor.execute(query, (name, prizeMoney, date))
        
        transaction.commit()
        return JsonResponse({'status': 'success', 'message': 'Competition added successfully.'})
    
@csrf_exempt
def team(request):
    if(request.method=="GET"):
        query = "select * from event_team"
        team_members = []
        with connection.cursor() as cursor:
            cursor.execute(query)
            team_members = cursor.fetchall()
        team_data=[]
        for member in team_members:
            team_data.append({"name": member[1], "rollNo": member[0], "position": member[2], "phoneNo": member[3], "emailId": member[4]})
        return JsonResponse(team_data, safe=False)
    
    if(request.method=="POST"):
        data = json.loads(request.body)
        name = data['name']
        rollNo = data['rollNo']
        position = data['position']
        phoneNo = data['phoneNo']
        emailId = data['emailId']
        password = data['password']
        query = """
                    insert into event_team (rollNo, name, position, phoneNo, emailId, password) values (%s,%s,%s,%s,%s,%s) 
                """
        with connection.cursor() as cursor:
            cursor.execute(query, (rollNo, name, position, phoneNo, emailId, password))
        transaction.commit()
        return JsonResponse({'status': 'success', 'message': 'Team Member added successfully.'})

@csrf_exempt
def event(request):
    if(request.method=="GET"):
        query = "select * from event_event"
        event_list = []
        with connection.cursor() as cursor:
            cursor.execute(query)
            event_list= cursor.fetchall()
        event_data = []
        for event in event_list:
            event_data.append({"name": event[0], "venue": event[1], "dateTime": event[2], "id": event[3]})
        return JsonResponse(event_data, safe=False)
    if(request.method=="POST"):
        data = json.loads(request.body)
        name = data["name"]
        venue = data["venue"]
        dateTime = data["dateTime"]
        query = """
                    insert into event_event (eventName, eventVenue, eventTime) values(%s,%s,%s)"""
        with connection.cursor() as cursor:
            cursor.execute(query, (name, venue, dateTime))
        transaction.commit()
        return JsonResponse({'status': 'success', 'message': 'Event added successfully.'})
    

@csrf_exempt
def participants(request):
    if(request.method=="POST"):
        data = json.loads(request.body)
        name = data['name']
        phoneNo = data['phoneNo']
        emailId = data['emailId']
        competitionName = data['competitionName']
        accommodation = data['accommodation']
        registrationId = uuid.uuid4()
        with connection.cursor() as cursor:
            query = f"select competitionId from event_competitions where competitionName= '{competitionName}'"
            cursor.execute(query)
            competitionId = cursor.fetchone()[0]
            print(competitionId)
            query = """
                        insert into event_participants (name, phoneNo, emailId, registrationId, accommodation, competitionId_id) values(%s,%s,%s,%s,%s,%s)
                    """
            cursor.execute(query, (name, phoneNo, emailId, registrationId, accommodation, competitionId ))
        transaction.commit()
        return JsonResponse({'status':'success', 'message': 'Successfully registered for the competition', 'registrationid': registrationId})