from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product
from .models import User
from .models import Order
from .models import CartItems
from .models import OrderItem
from .models import ShippingAddress
from .models import Transaction
from rest_framework_simplejwt.tokens import RefreshToken

class ProductSerializer(serializers.ModelSerializer): 
    class Meta: 
        model=Product
        fields="__all__"

class UserSerializer(serializers.ModelSerializer): 
    name=serializers.SerializerMethodField(read_only=True)
    _id=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)
    isActive=serializers.SerializerMethodField(read_only=True)

    class Meta: 
        model=User
        fields=['id','_id','username','email','name','isAdmin','isActive']

    def get_name(self,obj):
        firstname=obj.first_name
        lastname=obj.last_name
        name=firstname+' '+lastname
        if name=="":
            name=obj.email[:6]
            return name
        return name

    def get__id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff

    def get_isActive(self,obj):
        return obj.is_active
    
class UserSerializerWithToken(UserSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    
    class Meta: 
        model=User
        fields=['id','_id','username','email','name','isAdmin','token','isActive']

    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)
     


class CartItemsSerializer(serializers.ModelSerializer): 
     class Meta: 
        model=CartItems
        fields="__all__"


class ShippingAddressSerializer(serializers.ModelSerializer): 
     class Meta: 
        model=ShippingAddress
        fields="__all__"

class OrderSerializer(serializers.ModelSerializer): 
     class Meta: 
        model=Order
        fields="__all__"
        
class OrderItemSerializer(serializers.ModelSerializer): 
     class Meta: 
        model=OrderItem
        fields="__all__"

class CreateOrderSerializer(serializers.Serializer):
        amount=serializers.IntegerField()
        currency=serializers.CharField()

class TransactionModelSerializer(serializers.ModelSerializer): 
     class Meta: 
        model=Transaction
        fields=fields = ["payment_id", "order_id", "signature", "amount"]
