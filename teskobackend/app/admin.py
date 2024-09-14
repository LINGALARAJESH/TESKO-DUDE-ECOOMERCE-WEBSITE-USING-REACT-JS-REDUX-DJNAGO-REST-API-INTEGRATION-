from django.contrib import admin
from .models import Product,Order,OrderItem,Review,ShippingAddress,CartItems,Transaction

# Register your models here.
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Review)
admin.site.register(ShippingAddress)
admin.site.register(CartItems)
admin.site.register(Transaction)