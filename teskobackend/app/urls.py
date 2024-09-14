from django.urls import path,include
from app import views
from .views import create_payment, execute_payment, CreateOrderAPIView,TransactionAPIView

from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

urlpatterns = [   

    path("/",views.getRoutes,name="getRoutes"),
    path("products/",views.getProducts,name="getProducts"),
    path("products/<str:pk>",views.getProduct,name="getProduct"),
    path('users/', views.getUsers, name='getUsers'),
    path('users/login/',  views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/',views.getUserProfiles, name='getUserProfiles'),
    path('users/register/',views.registerUser,name='registerUser'),
    path("users/reset/<str:email>",views.resetinfo,name="resetinfo"),
    path('users/addcartdata/',views.Addcartdata,name='Addcartdata'),
    path('users/addcartdata/<userid>/<productId>',views.Delcartdata,name='Delcartdata'),
    path('users/addcartdata/<userid>',views.getcartdata,name='getcartdata'),
    path("activate/<uidb64>/<token>",views.ActivateAccountView.as_view(),name="activate"), 
    path('users/shippingcartdata/',views.ShippingCartData,name='ShippingCartData'),
    path('users/proceedcartorder/',views.ProceedCartOrder,name='ProceedCartOrder'),
    path('users/proceedcartorder/<int:pk>/', views.order_detail_update, name='order-detail-update'),
    path('users/allorders/<int:pk>/',views.Ordersdata,name='Ordersdata'),
    path('users/OrderProductdata/',views.OrderProductdata,name='OrderProductdata'),
    path('users/create-payment/', create_payment, name='create_payment'),
    path("users/rzporder/create/",CreateOrderAPIView.as_view(), name="create-order-api"),
    path("users/rzporder/complete/",TransactionAPIView.as_view(), name="complete-order-api"),
    path("users/set-new-password/<uidb64>/<token>",views.SetNewpasswordView,name="set-new-password"),
]

