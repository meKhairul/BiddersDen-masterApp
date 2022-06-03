from datetime import datetime
from itertools import product
from tkinter import CASCADE
from django.db import models

# Create your models here.

class credentials(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

class Users(models.Model):
    uid = models.CharField(primary_key=True, max_length=100)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    isVerified = models.BooleanField(default=False)
    
    def __str__(self):
        return self.username

class Product(models.Model):
    uid = models.CharField(primary_key=True, max_length=100)    
    product_name = models.CharField(max_length=300)
    product_category = models.CharField(max_length=300)
    base_price = models.IntegerField()
    product_details = models.CharField(max_length=300)
    current_price = models.IntegerField()
    time_to_bid = models.IntegerField()
    recieved_date = models.CharField(max_length=100)
    shipping_date = models.CharField(max_length=100)
    delivered_date = models.CharField(max_length=100)
    isApproved = models.BooleanField(default=False)
    seller = models.ForeignKey(Users, related_name="seller", on_delete=models.CASCADE)
    isSold = models.BooleanField()
    buyerID = models.CharField(max_length=100)
    bidder = models.ManyToManyField(Users)
    
    def __str__(self):
        return self.product_name

class File(models.Model):
    image_file = models.FileField(blank=False, null=False)
    def __str__(self):
        return self.file.name

class Bids(models.Model):
    productId = models.CharField(max_length=100)
    bidderId = models.CharField(max_length=100)
    bidAmount = models.IntegerField()

       
    def __str__(self):
        return self.bidAmount

class Transactions(models.Model):
    productId = models.CharField(max_length=100)
    buyerId = models.CharField(max_length=100)
    sellerId = models.CharField(max_length=100)
    amount = models.IntegerField()
    transactionId = models.CharField(max_length=100)
       
    def __str__(self):
        return self.transactionId

class Messages(models.Model):
    text = models.CharField(max_length=100)
    room = models.CharField(max_length=100)
    time = models.DateTimeField(default=datetime.now, blank=True)
    sender = models.CharField(max_length=100)

    def __str__(self):
        return self.text