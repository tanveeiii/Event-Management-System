from django.shortcuts import render
from .models import Speakers, Competitions, Team
from django.db import connection, transaction
from django.http import JsonResponse
import json
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
            print(competitions_list)
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
        print(team_members)
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
        return JsonResponse({'status': 'success', 'message': 'Competition added successfully.'})