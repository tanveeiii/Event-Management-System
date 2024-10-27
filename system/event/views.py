from django.db import connection, transaction
from django.http import JsonResponse
import json
import uuid
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import base64

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
        hashed_password = make_password(password)
        query = """
                    insert into event_team (rollNo, name, position, phoneNo, emailId, password) values (%s,%s,%s,%s,%s,%s) 
                """
        with connection.cursor() as cursor:
            cursor.execute(query, (rollNo, name, position, phoneNo, emailId, hashed_password))
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
    if(request.method=="GET"):
        query = "select * from event_participants"
        with connection.cursor() as cursor:
            cursor.execute(query)
            participants_list = cursor.fetchall()
        participants_data=[]
        for participant in participants_list:
            participants_data.append({"name": participant[0], "phoneNo": participant[1], "emailId":participant[2], "registrationid": participant[3], "accommodation": participant[4], "competitionId": participant[5]})
        return JsonResponse(participants_data, safe=False)
    
@csrf_exempt
def speakers(request):
    if(request.method=="GET"):
        query = "select * from event_speakers"
        with connection.cursor() as cursor:
            cursor.execute(query)
            speakers_list = cursor.fetchall()
        speakers_data = []
        for speaker in speakers_list:
            data_url = f"data:image/jpeg;base64,{speaker[3]}"
            speakers_data.append({"name": speaker[1], "desc" : speaker[2], "image" : data_url})
        return JsonResponse(speakers_data, safe=False)
    if(request.method=="POST"):
        name = request.POST.get('name')
        desc = request.POST.get('desc')
        image = request.FILES['image']
        image_data = image.read()
        encoded_image = base64.b64encode(image_data).decode('utf-8')
        with connection.cursor() as cursor:
            query = """
                        insert into event_speakers (name, description, image) values (%s,%s,%s)
                    """
            cursor.execute(query, (name, desc, encoded_image))
        transaction.commit()
        return JsonResponse({"status":"success", "message": "Speaker data added successfully"})

@csrf_exempt
def attendees(request):
    if(request.method=="POST"):
        data = json.loads(request.body)
        name = data['name']
        phoneNo = data['phoneNo']
        emailId = data['emailId']
        accommodation = data['accommodation']
        ticketId = uuid.uuid4()
        with connection.cursor() as cursor:
            
            query = """
                        insert into event_attendees (name, phoneNo, emailId, ticketId, accommodation) values(%s,%s,%s,%s,%s)
                    """
            cursor.execute(query, (name, phoneNo, emailId, ticketId, accommodation ))
        transaction.commit()
        return JsonResponse({'status':'success', 'message': 'Ticket bought successfully', 'ticketid': ticketId})
    if(request.method=="GET"):
        query = "select * from event_attendees"
        with connection.cursor() as cursor:
            cursor.execute(query)
            attendees_list = cursor.fetchall()
        attendees_data=[]
        for attendee in attendees_list:
            attendees_data.append({"name": attendee[0], "phoneNo": attendee[1], "emailId":attendee[2], "ticketid": attendee[3], "accommodation": attendee[4]})
        return JsonResponse(attendees_data, safe=False)
    
@csrf_exempt
def sponsors(request):
    if(request.method=="GET"):
        query = "select * from event_sponsors"
        with connection.cursor() as cursor:
            cursor.execute(query)
            sponsors_list = cursor.fetchall()
        sponsors_data = []
        for sponsor in sponsors_list:
            data_url = f"data:image/jpeg;base64,{sponsor[0]}"
            print(sponsor)
            sponsors_data.append({"name": sponsor[1], "amt" : sponsor[2], "dealBy" : sponsor[5], "phoneNo":sponsor[3], "emailId": sponsor[4], "logo": data_url})
        return JsonResponse(sponsors_data, safe=False)
    if(request.method=="POST"):
        name = request.POST.get('name')
        amt = request.POST.get('amt')
        dealBy = request.POST.get('dealBy')
        phoneNo = request.POST.get('phoneNo')
        emailId = request.POST.get('emailId')
        image = request.FILES['logo']
        image_data = image.read()
        encoded_image = base64.b64encode(image_data).decode('utf-8')
        with connection.cursor() as cursor:
            fetch_rollNo = f"select rollNo from event_team where name = '{dealBy}'"
            cursor.execute(fetch_rollNo)
            dealBy_rollNo = cursor.fetchone()[0]
            query = """
                        insert into event_sponsors (name, sponsorshipAmount, logo, dealBy_id, phoneNo, emailId) values (%s,%s,%s,%s,%s,%s)
                    """
            cursor.execute(query, (name, amt, encoded_image, dealBy_rollNo, phoneNo, emailId ))
        transaction.commit()
        return JsonResponse({"status":"success", "message": "Sponsor data added successfully"})
    
@csrf_exempt
def login(request):
    if(request.method == "POST"):
        data = json.loads(request.body)
        rollNo = data['rollNo']
        password = data['password']
        with connection.cursor() as cursor:
            query = f"select password from event_team where rollNo = {rollNo}"
            cursor.execute(query)
            password_stored = cursor.fetchone()[0]
            print(password_stored)
            if(check_password(password, password_stored)):
                return JsonResponse({"status":"success", "message": "User exists... Login successful", "rollNo" : rollNo}) 
            else:
                return JsonResponse({"status":"failure", "message":"User not found"})  


    