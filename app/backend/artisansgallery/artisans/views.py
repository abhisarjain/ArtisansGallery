from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from .serializers import *
from .models import User
from .renderers import UserRenderer
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
User = get_user_model()
# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

# Create your views here.
class UserRegisterView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user =  serializer.save()
            token = get_tokens_for_user(user)
            return Response({'message' :'Registration successful','token' : token},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class ArtisanRegisterView(APIView):
    renderer_classes = [JSONRenderer]

    def post(self, request):
        artisan_data = request.data.get('artisan', {})
        serializer = ArtisanRegistrationSerializer(data=request.data, context={'artisan_data': artisan_data})

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomerRegisterView(APIView):
    renderer_classes = [JSONRenderer]

    def post(self, request):
        customer_data = request.data.get('customer', {})
        serializer = CustomerRegistrationSerializer(data=request.data, context={'customer_data': customer_data})

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            user = authenticate(username=username,password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'message' :'Login successful','token' : token},status=status.HTTP_200_OK)
            else:
                return Response({'errors' : {'non_field_errors':['Email or password is not valid'] }},status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    


class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CustomerProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        customer = User.objects.get(pk=request.user.pk).customer
        serializer = CustomerProfileSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ArtisanProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        artisan = User.objects.get(pk=request.user.pk).artisans
        serializer = ArtisanProfileSerializer(artisan)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AllProductsView(APIView):
    def get(self,request):
        products = Product.objects.all()
        serializer = AllProductsSerializers(products,many=True)
        return Response({'products' : serializer.data})


class AddProductsView(APIView):
    def post(self,request):
        request.data["artisan"] = request.user.id
        print(request.user.id)
        
        if request.user.id is None:
            return Response({'errors' : "Please Login"},status=status.HTTP_400_BAD_REQUEST)
        elif Artisans.objects.filter(user = request.user.id).first() is None:
            return Response({'errors' : "You are not an artisan"},status=status.HTTP_400_BAD_REQUEST)
        serializer = AddProductSerializers(data=request.data )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def get(self, request, pk):
        product = Product.objects.filter(id=pk).first()
        if not product:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = AllProductsSerializers(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        product = Product.objects.get(pk=pk)
        request.data["artisan"] = request.user.id
        
        if request.user.id is None:
            return Response({'errors' : "Please Login"},status=status.HTTP_400_BAD_REQUEST)
        serializer = AddProductSerializers(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class MyProductsView(APIView):
    def get(self,request):
        if request.user.id is None:
            return Response({'errors' : "Please Login"},status=status.HTTP_400_BAD_REQUEST)
        if request.user.is_artisan:
            product = Product.objects.filter(artisan = request.user.id)
            serializer = AddProductSerializers(product,many=True)
            return Response({'myproducts' : serializer.data})
        else:
            return Response({'errors' : "You are not an artisan"},status=status.HTTP_400_BAD_REQUEST)
        

class CartView(APIView):
    def post(self,request):
        if request.user.id is None:
            return Response({'errors' : "Please Login"},status=status.HTTP_400_BAD_REQUEST)
        if not request.user.is_artisan:
            request.data['customer'] = request.user.id
            product_id = request.data.get('product')
            quantity = request.data.get('quantity')
            
            cart_item = Cart.objects.filter(customer=request.user.id, product=product_id).first()
            
            if cart_item:
                cart_item.quantity += quantity
                cart_item.save()
                serializer = CartSerializers(cart_item)
                return Response(serializer.data, status=200)
            
            serializer = CartSerializers(data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'errors' : "You are not a customer"},status=status.HTTP_400_BAD_REQUEST)
    

    def get(self,request):
        if request.user.id is None:
            return Response({'errors' : "Please Login"},status=status.HTTP_400_BAD_REQUEST)
        if not request.user.is_artisan:
            cart = Cart.objects.filter(customer = request.user.id)
            serializer = CartSerializers(cart,many=True)
            total_price, item_count = Cart.calculate_total_price(request.user.id)
            response_data = {'mycart': {'myproducts': serializer.data,'total_price': total_price,'item_count': item_count,}}
            return Response(response_data)
        else:
            return Response({'errors' : "You are not a customer"},status=status.HTTP_400_BAD_REQUEST)
        

class BuyNowView(APIView):
    def post(self,request):
        if request.user.id is None:
            return Response({'errors' : "Please Login"},status=status.HTTP_400_BAD_REQUEST)
        if not request.user.is_artisan:
            request.data['customer'] = request.user.id
            product_id = request.data.get('product')
            quantity = request.data.get('quantity')
            item = Product.objects.filter(id = product_id).first()
            item.stock = item.stock - quantity
            item.save()
            serializer = BuyNowSerializers(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'errors' : "You are not a customer"},status=status.HTTP_400_BAD_REQUEST)


class BuyAllView(APIView):
    def post(self, request):
        if request.user.id is None:
            return Response({'errors': "Please Login"}, status=status.HTTP_400_BAD_REQUEST)

        if not request.user.is_artisan:
            customer = Customer.objects.filter(user=request.user).first()
            cart_items = Cart.objects.filter(customer=customer)

            order_items = []
            for cart_item in cart_items:
                product = cart_item.product
                quantity = cart_item.quantity

                if product.stock >= quantity:
                    product.stock -= quantity
                    product.save()
                    order_item = OrderHistory(customer=customer, product=product, quantity=quantity)
                    order_items.append(order_item)
                else:
                    return Response({'errors': f"Insufficient stock for product '{product.name}'"}, status=status.HTTP_400_BAD_REQUEST)

            # Save order items in OrderHistory
            OrderHistory.objects.bulk_create(order_items)

            # Delete cart items
            cart_items.delete()

            return Response({'message': "Cart items purchased successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({'errors': "You are not a customer"}, status=status.HTTP_400_BAD_REQUEST)


class UsernameValidationView(APIView):
    def post(self,request):
        get_username = request.data.get('username')
        username = User.objects.filter(username=get_username).first()
        if not username is None:
            return Response({'message': "Username is present"}, status=status.HTTP_200_OK)
        else:
            return Response({'error': "Username not find"}, status=status.HTTP_404_NOT_FOUND)
        

class EmailValidationView(APIView):
    def post(self,request):
        get_email = request.data.get('email')
        email = User.objects.filter(email=get_email).first()
        if not email is None:
            return Response({'message': "Email is present"}, status=status.HTTP_200_OK)
        else:
            return Response({'error': "Email not find"}, status=status.HTTP_404_NOT_FOUND)