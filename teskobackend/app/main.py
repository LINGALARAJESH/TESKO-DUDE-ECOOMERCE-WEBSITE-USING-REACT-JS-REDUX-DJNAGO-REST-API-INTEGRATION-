# from .import client
import razorpay
from rest_framework.serializers import ValidationError
from rest_framework import status

client = razorpay.Client(auth=("rzp_test_mTX9MQoshGNzyp", "75vrLuFodoHTKXdkqg565DTp"))

class RazoraypayClient:
    def create_order(self,amount,currency):
        print(amount,currency)
        data = {
            "amount": amount,
            "currency": currency,
        }



        try:
            order_data=client.order.create(data=data)
            return order_data
        except Exception as e:
            raise ValidationError(
                {
                    'status_code':status.HTTP_400_BAD_REQUEST,
                    'message':e,
                }
            )

    def verify_payment(self, razorpay_order_id, razorpay_payment_id, razorpay_signature):
        try:
            client.utility.verify_payment_signature({
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature

                })
        except Exception as e:
                raise ValidationError(
                    {
                        "status_code":status.HTTP_400_BAD_REQUEST,
                        "message":e,
                    }
                )
