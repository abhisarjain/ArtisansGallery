from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.deletion import CASCADE
from django.conf import settings
from django.contrib.auth.models import AbstractUser, auth
# Create your models here.

from django.dispatch import receiver
from django.db.models.signals import post_save
from django.db.models.signals import pre_save


class User(AbstractUser):
    is_artisan = models.BooleanField(default=False)

@receiver(post_save, sender=User)
def create_profile_related_models(sender, instance, created, **kwargs):
    if created:
        if instance.is_artisan:
            Artisans.objects.create(user=instance)
        else:
            Customer.objects.create(user=instance)
    else:
        if instance.is_artisan:
            Artisans.objects.update_or_create(user=instance)
        else:
            Customer.objects.update_or_create(user=instance)






class Artisans(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    dp = models.ImageField(upload_to='artisans/images/dp',default="")
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.user.username

class Category(models.Model):
    category_name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    stock = models.PositiveIntegerField()
    artisan = models.ForeignKey(Artisans, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    product_image = models.ImageField(upload_to='artisans/images/products',default="")
    def __str__(self):
        return ("id = " + str(self.id) + " having name- " + self.name)
    
class Customer(models.Model):
    dp = models.ImageField(upload_to='customer/images/dp',default="")
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    shipping_address = models.TextField()
    billing_address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.user.username


class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    @staticmethod
    def calculate_total_price(customer):
        cart_items = Cart.objects.filter(customer=customer)
        total_price = sum(item.price * item.quantity for item in cart_items)
        item_count = cart_items.count()
        return total_price, item_count
    
    def save(self, *args, **kwargs):
        if not self.pk:  # Only update the price if the instance is being created, not updated
            self.price = self.product.price
        super().save(*args, **kwargs)

    def __str__(self):
        return (self.customer.user.username + "'s cart item")

class OrderHistory(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=CASCADE)
    quantity = models.PositiveIntegerField()
    def __str__(self):
        return (self.customer.user.username + "'s product")


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

