import razorpay
from django.http import JsonResponse
from dotenv import load_dotenv
import os

load_dotenv()
RAZORPAY_ID = os.getenv("RAZORPAY_ID")
RAZORPAY_KEY = os.getenv("RAZORPAY_SECRET_KEY")
client = razorpay.Client(auth=(RAZORPAY_ID, RAZORPAY_KEY))

def create_order():
    data = { "amount": 500, "currency": "INR", "receipt": "11" }
    payment = client.order.create(data=data)
    return JsonResponse({"order_id": payment['id']})


def verify_signature(razorpay_order_id , razorpay_payment_id, razorpay_signature):
    client.utility.verify_payment_signature({
   'razorpay_order_id': razorpay_order_id,
   'razorpay_payment_id': razorpay_payment_id,
   'razorpay_signature': razorpay_signature
   })