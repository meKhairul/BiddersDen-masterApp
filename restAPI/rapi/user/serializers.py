from rest_framework import serializers
from user.models import Transactions
from user.models import Bids
from user.models import Product
from user.models import Users
from user.models import Users, File, credentials
from user.models import Bids,Messages
    
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = credentials
        fields = ('username',
                  'password')


class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ('name',
                  'phone_number',
                  'email',
                  'address',
                  'username',
                  'password',)

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = (
                    'uid',
                    'product_name',
                  'product_category',
                  'base_price',
                  'product_details',
                  'current_price',
                  'time_to_bid',
                  'recieved_date',
                  'shipping_date',
                  'delivered_date',
                  'isApproved',
                  'seller',
                  'buyerID',
                  )

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"

class BidsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bids
        fields = ('productId',
                  'bidderId',
                  'bidAmount',)


class TransactionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transactions
        fields = ('productId',
                  'buyerId',
                  'sellerId',
                  'amount',
                  'transactionId',)

class MessagesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Messages
        fields = ('text',
                  'room',
                  'time',
                  'sender',)