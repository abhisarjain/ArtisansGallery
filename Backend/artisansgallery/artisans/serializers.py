from rest_framework import serializers
from .models import *

from django.contrib.auth import get_user_model

User = get_user_model()
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password','is_artisan']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class ArtisanRegistrationSerializer(serializers.ModelSerializer):
    dp = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'password', 'is_artisan', 'dp','last_name','email']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_artisan': {'default': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        artisan_data = self.context.get('artisan_data', {})
        Artisans.objects.update_or_create(user=user, defaults=artisan_data)

        return user


class CustomerRegistrationSerializer(serializers.ModelSerializer):
    dp = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'password', 'is_artisan', 'dp','last_name','email']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_artisan': {'default': False}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        customer_data = self.context.get('customer_data', {})
        Customer.objects.update_or_create(user=user, defaults=customer_data)

        return user

    
class UserLoginSerializer(serializers.Serializer):
    
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        # Perform any additional validation here (e.g., check if the user is active)
        
        # Return the validated data
        return data
        

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'is_artisan']


class CustomerProfileSerializer(serializers.ModelSerializer):
    first_name =  serializers.CharField(source='user.first_name', read_only=True)
    last_name =  serializers.CharField(source='user.last_name', read_only=True)
    email =  serializers.CharField(source='user.email', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta: 
        model = Customer
        fields = ['first_name','last_name','email','username','shipping_address']


class ArtisanProfileSerializer(serializers.ModelSerializer):
    first_name =  serializers.CharField(source='user.first_name', read_only=True)
    last_name =  serializers.CharField(source='user.last_name', read_only=True)
    email =  serializers.CharField(source='user.email', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta: 
        model = Artisans
        fields = ['first_name','last_name','email','username']

class AllProductsSerializers(serializers.ModelSerializer):
   artisan_name = serializers.CharField(source='artisan.user', read_only=True)
   class Meta:
      model = Product
      fields = ['name', 'description','price','artisan_name','product_image','id','stock']

class AddProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name','description', 'price', 'stock', 'artisan','category','id']
    def __init__(self, instance=None, data=None, **kwargs):
        kwargs['partial'] = True
        super().__init__(instance=instance, data=data, **kwargs)

class CartSerializers(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['customer','product','quantity','price']

class BuyNowSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrderHistory
        fields = ['customer','product','quantity']


class UsernameValidationSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class EmailValidationSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']