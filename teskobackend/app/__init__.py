import razorpay
from django.conf import settings
client = razorpay.Client(auth=(settings.ROZORPAY_KEY_ID,settings.ROZORPAY_KEY_SECREAT))