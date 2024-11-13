from django.db import connection, transaction
from django.http import JsonResponse
import json
import uuid
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import base64
import razorpay
from dotenv import load_dotenv
import os

load_dotenv()
RAZORPAY_ID = os.getenv("RAZORPAY_ID")
RAZORPAY_KEY = os.getenv("RAZORPAY_SECRET_KEY")
client = razorpay.Client(auth=(RAZORPAY_ID, RAZORPAY_KEY))

@csrf_exempt
@transaction.atomic
def create_order(request):
    data = json.loads(request.body)
    if(request.method=="POST"):
        data = { "amount": data['amount'], "currency": "INR" }
        payment = client.order.create(data=data)
        print(payment)
        return JsonResponse({"razorpay_order_id": payment['id']})

@csrf_exempt
def competitions(request):
    if(request.method=="GET"):
        id = request.GET.get("id")
        print(id)
        if(id):
            query = f"select * from event_competitions where competitionId = {id}"
        else:
            query = "select * from event_competitions"
        print(query)
        competitions_list=[]
        with connection.cursor() as cursor:
            cursor.execute(query)
            competitions_list=cursor.fetchall()
        competitions_data = []
        for competition in competitions_list:
            data_url = f"data:image/jpeg;base64,{competition[4]}"
            competitions_data.append({"name": competition[0], "prizeMoney": competition[1], "date": competition[2], "id": competition[3], "image":data_url})
        return JsonResponse(competitions_data, safe=False)
    if(request.method=="POST"):
        name = request.POST.get('name')
        prizeMoney = request.POST.get('prizeMoney')
        date = request.POST.get("date")
        image = request.FILES.get('image')
        print(name, prizeMoney, date, image)
        image_data = image.read()
        encoded_image = base64.b64encode(image_data).decode('utf-8')
        query = """
                    insert into event_competitions(competitionName, prizeMoney, date, poster) values (%s,%s,%s,%s)
                """
        with connection.cursor() as cursor:
            cursor.execute(query, (name, prizeMoney, date, encoded_image))
        
        transaction.commit()
        return JsonResponse({'status': 'success', 'message': 'Competition added successfully.'})
    
    if(request.method=="DELETE"):
        data = json.loads(request.body)
        competitionId = data['id']
        query = f"delete from event_competitions where competitionId = {competitionId}"
        with connection.cursor() as cursor:
            cursor.execute(query)
        transaction.commit()
        return JsonResponse({"status":"success", "message": "Deleted competition successfully"})

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
            data_url = f"data:image/jpeg;base64,{member[9]}"
            team_data.append({"name": member[1],"password":member[5], "id": member[0],"image":data_url, "position": member[2], "teamName": member[8],  "phoneNo": member[3], "emailId": member[4], "instagramId": member[6], "linkedinId": member[7]})
        return JsonResponse(team_data, safe=False)
    
    if(request.method=="POST"):
        # data = json.loads(request.body)
        name = request.POST.get('name')
        rollNo = request.POST.get('id')
        position = request.POST.get('position')
        phoneNo = request.POST.get('phoneNo')
        emailId = request.POST.get('emailId')
        password = request.POST.get('password')
        instagramId = request.POST.get('instagramId')
        linkedinId = request.POST.get('linkedinId')
        teamName = request.POST.get('teamName')
        image = request.FILES.get('image')
        image_data = image.read()
        encoded_image = base64.b64encode(image_data).decode('utf-8')
        hashed_password = make_password(password)
        query = """
                    insert into event_team (rollNo, name, position, phoneNo, emailId, password, instagramId, linkedinId, teamName, image) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) 
                """
        with connection.cursor() as cursor:
            cursor.execute(query, (rollNo, name, position, phoneNo, emailId, hashed_password, instagramId, linkedinId, teamName, encoded_image))
        transaction.commit()
        return JsonResponse({'status': 'success', 'message': 'Team Member added successfully.'})
    if(request.method=="DELETE"):
        data = json.loads(request.body)
        rollNo = data['id']
        with connection.cursor() as cursor:
            query = f"delete from event_team where rollNo = {rollNo}"
            cursor.execute(query)
        transaction.commit()
        return JsonResponse({"status":"success", "messsage":"team member deleted successfully"})

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
            event_data.append({"name": event[0], "venue": event[1], "time": event[2], "id": event[3], "desc": event[4], "dayNo":event[5], "eventDate":event[6]})
        return JsonResponse(event_data, safe=False)
    if(request.method=="POST"):
        data = json.loads(request.body)
        print(data)
        name = data["name"]
        venue = data["venue"]
        time = data["time"]
        desc = data["desc"]
        date = data['eventDate']
        dayNo = data['dayNo']
        query = """
                    insert into event_event (eventName, eventVenue, eventTime, eventDesc, dayNo, eventDate) values(%s,%s,%s,%s,%s,%s)"""
        with connection.cursor() as cursor:
            cursor.execute(query, (name, venue, time, desc, dayNo, date))
        transaction.commit()
        return JsonResponse({'status': 'success', 'message': 'Event added successfully.'})
    if(request.method=="DELETE"):
        data = json.loads(request.body)
        id = data['id']
        with connection.cursor() as cursor:
            query = f"delete from event_event where eventId = {id}"
            cursor.execute(query)
        transaction.commit()
        return JsonResponse({"status":"success", "message":"Event deleted successfully"})

    

@csrf_exempt
def participants(request):
    if(request.method=="POST"):
        data = json.loads(request.body)
        name = data['name']
        phoneNo = data['phoneNo']
        emailId = data['emailId']
        competitionName = data['competitionName']
        # accommodation = data['accommodation']
        registrationId = uuid.uuid4()
        with connection.cursor() as cursor:
            query = f"select competitionId from event_competitions where competitionName= '{competitionName}'"
            cursor.execute(query)
            competitionId = cursor.fetchone()[0]
            print(competitionId)
            query = """
                        insert into event_participants (name, phoneNo, emailId, registrationId,  competitionId_id) values(%s,%s,%s,%s,%s)
                    """
            cursor.execute(query, (name, phoneNo, emailId, registrationId, competitionId ))
        transaction.commit()
        return JsonResponse({'status':'success', 'message': 'Successfully registered for the competition', 'registrationid': registrationId, "competitionName":competitionName})
    if(request.method=="GET"):
        query = "select * from event_participants"
        with connection.cursor() as cursor:
            cursor.execute(query)
            participants_list = cursor.fetchall()
        participants_data=[]
        for participant in participants_list:
            participants_data.append({"name": participant[0], "phoneNo": participant[1], "emailId":participant[2], "id": participant[3],  "competitionId": participant[4]})
        return JsonResponse(participants_data, safe=False)
    if(request.method=="DELETE"):
        data = json.loads(request.body)
        id = data['id']
        with connection.cursor() as cursor:
            query = f"delete from event_participants where eventId = {id}"
            cursor.execute(query)
        transaction.commit()
        return JsonResponse({"status":"success", "message":"Participant deleted successfully"})
    
@csrf_exempt
def speakers(request):
    if(request.method=="GET"):
        query = "select * from event_speakers"
        with connection.cursor() as cursor:
            cursor.execute(query)
            speakers_list = cursor.fetchall()
        speakers_data = []
        for speaker in speakers_list:
            data_url = f"data:image/jpeg;base64,{speaker[2]}"
            speakers_data.append({"name": speaker[0], "desc" : speaker[1], "image" : data_url, "id":speaker[3]})
        return JsonResponse(speakers_data, safe=False)
    if(request.method=="POST"):
        name = request.POST.get('name')
        desc = request.POST.get('desc')
        image = request.FILES.get('image')
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
        # amt = data['amount']
        transactionId = data['transactionId']
        ticketId = uuid.uuid4()
        with connection.cursor() as cursor:
            
            query = """
                        insert into event_attendees (name, phoneNo, emailId, ticketId, accommodation,transactionId) values(%s,%s,%s,%s,%s,%s)
                    """
            cursor.execute(query, (name, phoneNo, emailId, ticketId, accommodation,transactionId ))
        transaction.commit()
        return JsonResponse({'status':'success', 'message': 'Ticket bought successfully', 'ticketid': ticketId})
    if(request.method=="GET"):
        query = "select * from event_attendees"
        with connection.cursor() as cursor:
            cursor.execute(query)
            attendees_list = cursor.fetchall()
        attendees_data=[]
        for attendee in attendees_list:
            attendees_data.append({"name": attendee[0], "phoneNo": attendee[1], "emailId":attendee[2], "id": attendee[3], "accommodation": attendee[4], "transactionId":attendee[5]})
        return JsonResponse(attendees_data, safe=False)
    if(request.method=="DELETE"):
        data = json.loads(request.body)
        print(data)
        ticketId = data.get('id')
        query = f"delete from event_attendees where ticketId = '{ticketId}'"
        with connection.cursor() as cursor:
            cursor.execute(query)
        transaction.commit()
        return JsonResponse({"status":"success", "message": "Deleted attendee successfully"})
    
@csrf_exempt
def sponsors(request):
    if(request.method=="GET"):
        query = "select * from event_sponsors"
        with connection.cursor() as cursor:
            cursor.execute(query)
            sponsors_list = cursor.fetchall()
        sponsors_data = []
        for sponsor in sponsors_list:
            data_url = f"data:image/jpeg;base64,{sponsor[1]}"
            # print(sponsor)
            sponsors_data.append({"name": sponsor[2], "amt" : sponsor[3], "dealBy" : sponsor[4], "phoneNo":sponsor[5], "emailId": sponsor[6], "image": data_url, "link": sponsor[8], "title":sponsor[7]})
        return JsonResponse(sponsors_data, safe=False)
    if(request.method=="POST"):
        name = request.POST.get('name')
        amt = request.POST.get('amt')
        dealBy = request.POST.get('dealBy')
        phoneNo = request.POST.get('phoneNo')
        emailId = request.POST.get('emailId')
        image = request.FILES['image']
        title = request.POST.get('title')
        link = request.POST.get('link')
        image_data = image.read()
        encoded_image = base64.b64encode(image_data).decode('utf-8')
        with connection.cursor() as cursor:
            fetch_rollNo = f"select rollNo from event_team where name = '{dealBy}'"
            cursor.execute(fetch_rollNo)
            dealBy_rollNo = cursor.fetchone()[0]
            query = """
                        insert into event_sponsors (name, sponsorshipAmount, logo, dealBy, phoneNo, emailId, title, link) values (%s,%s,%s,%s,%s,%s,%s,%s)
                    """
            cursor.execute(query, (name, amt, encoded_image, dealBy_rollNo, phoneNo, emailId, title, link))
        transaction.commit()
        return JsonResponse({"status":"success", "message": "Sponsor data added successfully"})
    
@csrf_exempt
def login(request):
    if(request.method == "POST"):
        data = json.loads(request.body)
        rollNo = int(data['rollNo'])
        password = data['password']
        with connection.cursor() as cursor:
            query = f"select password, teamName from event_team where rollNo = {rollNo}"
            cursor.execute(query)
            result = cursor.fetchone()
            if(result is None):
                return JsonResponse({"status":"failure", "message":"User not found", "loggedIn":False})
            else:
                password_stored = result[0]
                teamName = result[1]
                if(check_password(password, password_stored)):
                    request.session['loggedin'] = True
                    # request.session.modified = True
                    return JsonResponse({"status":"success", "message": "User exists... Login successful", "rollNo" : rollNo, "team": teamName, "loggedIn":True}) 
                else:
                    return JsonResponse({"status":"failure", "message":"User not found", "loggedIn": False}) 

@csrf_exempt
def gallery(request):
    if(request.method=="POST"):
        image = request.FILES['image']
        image_data = image.read()
        encoded_image = base64.b64encode(image_data).decode('utf-8')
        with connection.cursor() as cursor:
            query = "insert into event_gallery (image) values (%s)"
            cursor.execute(query, [encoded_image])
            transaction.commit()
            return JsonResponse({"status":"success", "message":"Image added successfully"})
        return JsonResponse({"status":"failure", "message":"Unable to add image to gallery"})
    if(request.method=="GET"):
        with connection.cursor() as cursor:
            query = "select * from event_gallery"
            cursor.execute(query)
            images = cursor.fetchall()
        images_data = []
        for image in images:
            image_url = f"data:image/jpeg;base64,{image[0]}"
            images_data.append({
                "image":image_url,
                "imageId":image[1]
            })
        return JsonResponse(images_data, safe=False)


def check_login(request):
    is_logged_in = request.session.get('loggedin')

    print(is_logged_in)
    return JsonResponse({'loggedIn': is_logged_in})