import razorpay
from django.http import JsonResponse

client = razorpay.Client(auth=("rzp_test_9q5xdxurtQtIt2", "lOLKN750Yh3MnGvimhpfj0hT"))

def create_order():
    # receipt_id = uuid.uuid4()
    data = { "amount": 500, "currency": "INR", "receipt": "11" }
    payment = client.order.create(data=data)
    return JsonResponse({"order_id": payment['id']})


def verify_signature(razorpay_order_id , razorpay_payment_id, razorpay_signature):
    client.utility.verify_payment_signature({
   'razorpay_order_id': razorpay_order_id,
   'razorpay_payment_id': razorpay_payment_id,
   'razorpay_signature': razorpay_signature
   })