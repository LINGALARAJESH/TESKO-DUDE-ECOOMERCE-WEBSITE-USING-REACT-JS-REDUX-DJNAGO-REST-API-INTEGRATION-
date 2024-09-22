from django.shortcuts import render
from django.http import JsonResponse
from .models import Product
from .models import User
from .models import Order
from .models import ShippingAddress
from .models import Transaction
from .models import CartItems
from .models import OrderItem
from django.views.generic import View
from rest_framework.response import Response
from .serializer import ProductSerializer,UserSerializer,UserSerializerWithToken,CartItemsSerializer,OrderSerializer, ShippingAddressSerializer,OrderItemSerializer,CreateOrderSerializer,TransactionModelSerializer,TransactionModelAllSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework import status

#To Activate user Account
from django.contrib.sites.shortcuts import get_current_site #to get the current url of site.
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode# for decoding and encoding the strings.
from django.urls import NoReverseMatch,reverse #check the reverse match.
from django.template.loader import render_to_string # to covnvert into strings
from django.utils.encoding import force_bytes,force_str,DjangoUnicodeDecodeError # convert in to some 64byte or 32 bytes
#getting tokes form utils.py
from .utils import TokenGenerator,generate_token
#Emails
from django.core.mail import send_mail,EmailMultiAlternatives#send the mail
from django.core.mail import BadHeaderError #When error occurs we use it.
from django.core import mail
from django.conf import settings# to give a host mail  data
from django.core.mail import EmailMessage
import threading
#Razorpay payment
from .main import RazoraypayClient
from rest_framework.exceptions import ValidationError
#payment paypal
from paypalrestsdk import Payment
from rest_framework.views import APIView
import paypalrestsdk
from django.views.decorators.csrf import csrf_exempt

# Initialize PayPal SDK
paypalrestsdk.configure({
    "mode": settings.PAYPAL_MODE,  # sandbox or live
    "client_id": settings.PAYPAL_CLIENT_ID,
    "client_secret": settings.PAYPAL_CLIENT_SECRET
})


class EmailThread(threading.Thread):
    def __init__(self,email_message):
        self.email_message=email_message
        threading.Thread.__init__(self)
    def run(self):
        self.email_message.send()

# New
def home(request):
    return render(request, 'home.html')
#New

@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)

#New
@api_view(['GET'])
def getOrders(request):
    orders=Order.objects.all()
    serializer=OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOrderitems(request):
    ordersitem=OrderItem.objects.all()
    serializer=OrderItemSerializer(ordersitem,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getShippingaddress(request):
    shippingAddress=ShippingAddress.objects.all()
    serializer=ShippingAddressSerializer(shippingAddress,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCartdetails(request):
    cartitem=CartItems.objects.all()
    serializer=CartItemsSerializer(cartitem,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTransdetails(request):
    Trans=Transaction.objects.all()
    serializer=TransactionModelAllSerializer(Trans,many=True)
    return Response(serializer.data)

#New

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data=super().validate(attrs)
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
      serializer_class=MyTokenObtainPairSerializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfiles(request):
    user=request.user
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user=User.objects.all()
    serializer=UserSerializer(user,many=True)
    return Response(serializer.data)


#register

@api_view(['POST'])
def registerUser(request):
    data=request.data
    print(data)
    try:
        user=User.objects.create(
        first_name=data['fname'],
        last_name=data['lname'],
        username=data['email'],
        email=data['email'],
        password=make_password(data['password']),
        is_active=False
        )

        #generate token for  sending mail
        email_subject="Activate Your Account"
        message=render_to_string(
            "activate.html",
           {'user':user,
            'domain':"https://teskoodude.pythonanywhere.com/",
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token':generate_token.make_token(user)
           }
        )

        print("email_subject='Activate Your Account'")

        email_message=EmailMessage(email_subject,message,settings.EMAIL_HOST_USER,[data['email']])
        EmailThread(email_message).start()


        serializer=UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except Exception as e:
        message={'details':e}
        return Response(message,status =status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def resetinfo(request,email):
    user=User.objects.filter(email=email)

    if user.exists():
        email_subject="[Reset the Password]"
        message=render_to_string(
                "rest-user-password.html",
                {   'user':user,
                    'domain':"https://lingalarajesh.github.io/teskofrontend/#",
                    'uid': urlsafe_base64_encode(force_bytes(user[0].pk)),
                    'token':generate_token.make_token(user[0])
                }

                )
        email_message=EmailMessage(email_subject,message,settings.EMAIL_HOST_USER,[email])
        EmailThread(email_message).start()
        return Response("Please Rest your Account password via Email...")

    else:
         return Response("Error")



@api_view(['POST'])
def SetNewpasswordView(request,uidb64,token):
        data=request.data
        context={
              'uidb64':uidb64,
               'token':token
        }
        password=data['password']
        conf_password=data['conform']

        if password!=conf_password:
            return Response("Password not matched")

        try:

            user_id =force_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(pk=user_id)
            user.set_password(password)
            user.save()
            return Response("Password Rest Successful")

        except DjangoUnicodeDecodeError  as identifier:
            return Response( messages.error(request,"something went wrong"))

# Activate Account
class ActivateAccountView(View):
    def get(self,request,uidb64,token):
        try:
            uid =force_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(pk=uid)
        except Exception as identifier:
            user=None
        if user is not None and generate_token.check_token(user,token):
            user.is_active=True
            user.save()
            message={'details':"Account is Activated "}
            return render(request,"activatesuccess.html")
        else:
            return render(request,"activatefail.html")



@api_view(['POST'])
def Addcartdata(request):
    data = request.data
    userID = data.get('userid')

    try:
        user = User.objects.get(id=userID)

        # Check if the product is already in the cart
        productdata = CartItems.objects.filter(user=user, productid=data['id']).first()

        if productdata:
            # If the product exists, delete the existing entry
            productdata.delete()

        # Create a new CartItem entry
        cartdata = CartItems(
            user=user,
            userintId=data['userid'],
            productid=data['id'],
            name=data['name'],
            countInStock=data['countInStock'],
            qty=data['qty'],
            size=data['size'],
            price=data['price'],
            image=data['image'],
        )
        cartdata.save()

        # Serialize and return updated cart items
        updateddata = CartItems.objects.filter(user=user)
        serializer = CartItemsSerializer(updateddata, many=True)
        return Response(serializer.data)

    except User.DoesNotExist:
        return Response({'status': 'error', 'message': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def Delcartdata(request, userid, productId):
    try:
        user = User.objects.get(id=userid)
        item = CartItems.objects.filter(user=user, productid=productId)

        if item.exists():
            item.delete()
            return Response({"message": "Item deleted successfully"}, status=204)
        else:
            return Response({"error": "Item not found"}, status=404)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
def getcartdata(request, userid,):

    user = User.objects.get(id=userid)
    item = CartItems.objects.filter(user=user)
    serializer=CartItemsSerializer(item,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def ShippingCartData(request):
    data = request.data
    orderID = data.get('orderid')
    try:
        order = Order.objects.get(_id=orderID)
        shippingrepeatdata = ShippingAddress.objects.filter(order=order)

        if shippingrepeatdata:
            shippingrepeatdata.delete()


        shippingdata = ShippingAddress(
            order=order,
            mobile=data['mobile'],
            address=data['address'],
            city=data['city'],
            postalCode=data['postalCode'],
            country=data['country'],
            shippingPrice=data['shippingprice'],
        )

        shippingdata.save()
        updateddata = ShippingAddress.objects.filter(order=order)
        serializer = ShippingAddressSerializer(updateddata, many=True)
        return Response(serializer.data)

    except Order.DoesNotExist:
        return Response({'status': 'error', 'message': ' not found'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def ProceedCartOrder(request):
    data = request.data
    userID = data.get('user')

    try:
        user = User.objects.get(id=userID)

        productdata = Order.objects.filter(user=user)

        orderdata = Order(
            user=user,
            totalPrice=data['totalPrice'],
            cartItems=data['cartItems'],
            mobile=data['mobile'],
            address=data['address'],
            postalCode=data['postalCode'],
            country=data['country'],
        )
        orderdata.save()

        updateddata = Order.objects.filter(user=user)
        serializer = OrderSerializer(updateddata, many=True)
        return Response(serializer.data)

    except User.DoesNotExist:
        return Response({'status': 'error', 'message': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def OrderProductdata(request):
    data = request.data
    orderID = data.get('orderid')
    userID = data.get('user')

    try:
        order = Order.objects.get(_id=orderID)
        orderItemdata = OrderItem.objects.filter(order=order)

        user = User.objects.get(id=userID)

        if orderItemdata:
             orderItemdata.delete()

        for i in data['product']:
            productID = i.get('productid')
            product=Product.objects.get(_id=productID)
            orderdata = OrderItem(
                order=order,
                user=user,
                product=product,
                name=i['name'],
                qty=i['qty'],
                size=i['size'],
                price=i['price'],
                image=i['image'],
            )
            orderdata.save()

        updateddata =OrderItem.objects.filter(user=user)
        serializer = OrderItemSerializer(updateddata, many=True)
        return Response(serializer.data)

    except Order.DoesNotExist:
        return Response({'status': 'error', 'message': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def create_payment(request):

    if request.method == "POST":
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": "2000.00",  # Modify this dynamically as needed
                    "currency": "USD"
                },
                "description": "Purchase description"
            }],
            "redirect_urls": {
                "return_url": "http://localhost:3000/payment-success",
                "cancel_url": "http://localhost:3000/payment-cancel"
            }
        })


        if payment.create():
            for link in payment.links:
                if link.rel == "approval_url":
                    approval_url = str(link.href)
                    return JsonResponse({'approval_url': approval_url})
        else:
            return JsonResponse({'error': payment.error}, status=500)

@csrf_exempt
def execute_payment(request):
    if request.method == "POST":

        payment_id = request.POST.get('paymentID')
        payer_id = request.POST.get('payerID')

        payment = paypalrestsdk.Payment.find(payment_id)

        if payment.execute({"payer_id": payer_id}):
            return JsonResponse({"status": "Payment executed successfully"})
        else:
            return JsonResponse({"error": payment.error}, status=500)


rz_client=RazoraypayClient()

class CreateOrderAPIView(APIView):
    def post(self,request):
        create_order_serializer=CreateOrderSerializer(data=request.data)
        if create_order_serializer.is_valid():
            amount = create_order_serializer.validated_data.get("amount")
            currency = create_order_serializer.validated_data.get("currency")

            print("Amount:", amount)
            print("Currency:", currency)

            try:
                # Call the Razorpay client to create an order
                order_response = rz_client.create_order(
                    amount=amount,
                    currency=currency,
                )

                response = {
                    "status_code": status.HTTP_201_CREATED,
                    "message": "order_created",
                    "data": order_response
                }
                return Response(response, status=status.HTTP_201_CREATED)

            except Exception as e:
                # Log the exact error message for better debugging
                print(f"Error while creating order: {str(e)}")
                response = {
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    "message": "Error creating order",
                    "error": str(e)
                }
                return Response(response, status=status.HTTP_400_BAD_REQUEST)

        else:
            # If serializer validation fails
            response = {
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "Bad request",
                "error": create_order_serializer.errors
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)




class TransactionAPIView(APIView):
    def post(self,request):
        transaction_serializer=TransactionModelSerializer(
            data=request.data
        )

        if transaction_serializer.is_valid():
            rz_client.verify_payment(
                razorpay_order_id = transaction_serializer.validated_data.get("order_id"),
                razorpay_payment_id = transaction_serializer.validated_data.get("payment_id"),
                razorpay_signature = transaction_serializer.validated_data.get("signature")
            )
            transaction_serializer.save()
            response={
                "status_code":status.HTTP_201_CREATED,
                "message":"transaction created"
            }
            return Response(response,status=status.HTTP_201_CREATED)
        else:
            response={
                "status_code":status.HTTP_201_CREATED,
                "message":"bad request",
                "error":transaction_serializer.errors
            }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH'])
def order_detail_update(request, pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response({'detail': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        updateddata = Order.objects.filter(user=order.user)

        serializer = OrderSerializer(updateddata, many=True)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        serializer = OrderSerializer(order, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()

            updateddata = Order.objects.filter(pk=pk)

            serializer = OrderSerializer(updateddata, many=True)
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def Ordersdata(request, pk):

    try:
        user = User.objects.get(id=pk)
        item = Order.objects.filter(user=user)
        serializer = OrderSerializer(item, many=True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
