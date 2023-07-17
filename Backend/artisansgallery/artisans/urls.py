# urls.py

from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import *

urlpatterns = [
  path('register/', UserRegisterView.as_view(),name= "register"),
  path('artisanregister/', ArtisanRegisterView.as_view(),name= "artisanregister"),
  path('customerregister/', CustomerRegisterView.as_view(),name= "customerregister"),
  path('login/', UserLoginView.as_view(),name= "login"),
  path('user/', UserProfileView.as_view(),name="user"),
  path('artisan/', ArtisanProfileView.as_view(),name="artisan"),
  path('customer/', CustomerProfileView.as_view(),name="customer"),
  path('usernameisvalid/', UsernameValidationView.as_view(),name="userisvalid"),
  path('emailisvalid/', EmailValidationView.as_view(),name="emailisvalid"),
  path('allproducts/',AllProductsView.as_view(),name= "allproducts"),
  path('addproduct/',AddProductsView.as_view(),name= "addproducts"),
  path('product/<int:pk>/', AddProductsView.as_view(), name='get-product'),
  path('myproducts/',MyProductsView.as_view(),name= "myproducts"),
  path('addtocart/',CartView.as_view(),name= "addtocart"),
  path('mycart/',CartView.as_view(),name= "mycart"),
  path('buynow/',BuyNowView.as_view(),name= "buynow"),
  path('buyall/',BuyAllView.as_view(),name= "buyall"),

  
]
