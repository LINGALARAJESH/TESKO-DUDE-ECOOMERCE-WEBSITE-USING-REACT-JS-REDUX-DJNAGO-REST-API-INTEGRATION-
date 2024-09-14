from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Product(models.Model):
    user=models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    name=models.CharField(null=True,blank=True, max_length=200)
    image=models.ImageField(null=True,blank=True,)
    brand=models.CharField(null=True,blank=True,max_length=200)
    category=models.CharField(null=True,blank=True, max_length=200)
    description=models.TextField(null=True,blank=True,)
    rating=models.DecimalField(null=True,blank=True, max_digits=7, decimal_places=2)
    numReviews=models.IntegerField(null=True,blank=True,default=0)
    price=models.DecimalField( max_digits=7, decimal_places=2,null=True,blank=True)
    countInStock=models.IntegerField(null=True,blank=True,default=0)
    createAt=models.DateTimeField( auto_now_add=True)
    _id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.name

class Review(models.Model):
    product=models.ForeignKey(Product, on_delete=models.SET_NULL,null=True)
    user=models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    name=models.CharField(null=True,blank=True, max_length=200)
    rating=models.IntegerField(null=True,blank=True, default=0)
    comment=models.TextField(null=True,blank=True,)
    _id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.rating)

class Order(models.Model):
    user=models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    totalPrice=models.CharField(null=True,blank=True, max_length=200)
    cartItems=models.CharField(null=True,blank=True, max_length=200)
    mobile=models.CharField(null=True,blank=True, max_length=200)
    address=models.CharField(null=True,blank=True, max_length=500)
    postalCode=models.CharField(null=True,blank=True, max_length=200)
    country=models.CharField(null=True,blank=True, max_length=200)

    paymentMethod=models.CharField(null=True,blank=True, max_length=200)
    taxPrice=models.DecimalField(null=True,blank=True, max_digits=7, decimal_places=2)
    isPaid=models.BooleanField(default=False)
    paidAt=models.DateTimeField( auto_now_add=False,null=True,blank=True)
    isDelivered=models.BooleanField(default=False)
    deliveredAt=models.DateTimeField( auto_now_add=False,null=True,blank=True)
    createdAt=models.DateTimeField( auto_now_add=True,null=True,blank=True)
    Razorpay_order_id=models.CharField(null=True,blank=True, max_length=200)
    Razorpay_Payment_id=models.CharField(null=True,blank=True, max_length=200)
    Razorpay_signature_id=models.CharField(null=True,blank=True, max_length=200)
    Transaction_id=models.CharField(null=True,blank=True, max_length=200)
    _id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return f"Order {self._id} - {self.user.username if self.user else 'Guest'} - Total: {self.totalPrice}"

class OrderItem(models.Model):
    user=models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    product=models.ForeignKey(Product, on_delete=models.SET_NULL,null=True)
    order=models.ForeignKey(Order, on_delete=models.SET_NULL,null=True)
    name=models.CharField(null=True,blank=True, max_length=200)
    qty=models.IntegerField(null=True,blank=True,default=0)
    price=models.CharField(null=True,blank=True, max_length=200)
    size=models.CharField(null=True,blank=True, max_length=200)
    image=models.CharField(null=True,blank=True, max_length=200)
    _id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
            return f"Order {self.order}: {self.name} - Qty: {self.qty}"

class ShippingAddress(models.Model):
    order=models.OneToOneField(Order,null=True,blank=True, on_delete=models.CASCADE)
    mobile=models.CharField(null=True,blank=True, max_length=200)
    address=models.CharField(null=True,blank=True, max_length=200)
    city=models.CharField(null=True,blank=True, max_length=200)
    postalCode=models.CharField(null=True,blank=True, max_length=200)
    country=models.CharField(null=True,blank=True, max_length=200)
    shippingPrice=models.IntegerField(null=True,blank=True,default=0)
    _id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return f"{self.address}, {self.city} ({self.postalCode})"

class CartItems(models.Model):
    user=models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    userintId=models.IntegerField(null=True,blank=True,default=0)
    productid=models.CharField(null=True,blank=True, max_length=200)
    name=models.CharField(null=True,blank=True, max_length=200)
    countInStock=models.IntegerField(null=True,blank=True,default=0)
    qty=models.IntegerField(null=True,blank=True,default=0)
    size=models.CharField( null=True,blank=True,max_length=50)
    price=models.CharField( null=True,blank=True,max_length=50)
    image=models.CharField(null=True,blank=True, max_length=200)
    _id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return f"{self.name} - Size: {self.size} - Qty: {self.qty}"

class Transaction(models.Model):
    payment_id = models.CharField(max_length=200, verbose_name="Payment ID", blank=True, null=True)
    order_id = models.CharField(max_length=200, verbose_name="Order ID", blank=True, null=True)
    signature = models.CharField(max_length=500, verbose_name="Signature", blank=True, null=True)
    amount = models.IntegerField(verbose_name="Amount", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.created_at}"


        
