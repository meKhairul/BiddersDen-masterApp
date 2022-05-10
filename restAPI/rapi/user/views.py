from itertools import product
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from user.models import Product
from user.serializers import FileSerializer
from user.serializers import ProductSerializer, BidsSerializer
from user.models import Users, Bids
from user.serializers import UsersSerializer, LoginSerializer
from rest_framework.parsers import FileUploadParser
from django.core.files.storage import default_storage
from django.contrib.auth.hashers import make_password, check_password
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

import uuid
from django.conf import settings
from django.core.mail import send_mail

from rest_framework.decorators import api_view
import jwt, datetime

# Create your views here.
@csrf_exempt
def register(request,id=0):
    if request.method=='POST':                                    #register
        users_data=JSONParser().parse(request)
        
        name = users_data['name']
        phone_number = users_data['phone_number']
        address = users_data['address']
        password = users_data['password']
        username = users_data['username']
        email = users_data['email']
        uid = str(uuid.uuid4())

        #print(password)
        
        hashed_password = make_password(password)

        user = Users.objects.filter(username=username).first()
        if user is not None:
            return JsonResponse("Username already exists!", safe = False)
        
        user = Users.objects.filter(email=email).first()
        if user is not None:
            return JsonResponse("This email already has a registered account associated with!", safe = False)
        
        Users.objects.create(uid= uid, name=name, phone_number = phone_number, email = email, address = address, username=username, password=hashed_password, isVerified = False)

        sendMail(email, uid)
        return JsonResponse("Please check your mail to verify your account", safe=False)

@csrf_exempt
def sendMail(email_to, uid):
    subject = 'Verify your account'
    body = 'Please click the link to verify your account http://127.0.0.1:8000/verify/' + uid
    email_from = settings.EMAIL_HOST_USER
    recipient = [email_to]
    send_mail(subject, body , email_from, recipient)
    print("mail sent")

@csrf_exempt
def verify(request, uid):
    print(uid)
    uid = str(uid)
    user = Users.objects.filter(uid=uid).first()
    if user:
        #print("User exists")
        if user.isVerified:
            return JsonResponse('Your account is already verified', safe = False)
        user.isVerified = True
        user.save()
        return JsonResponse('Your account has been verified', safe= False)
    return JsonResponse('No user found with this email', safe = False)

@csrf_exempt
@api_view(['POST'])
def addProduct(request,id=0):
    if request.method=='POST':                                    #register
        product_data=JSONParser().parse(request)
        seller_username = product_data['seller']
        uid = str(uuid.uuid4())
        print(seller_username)
        seller = Users.objects.filter(username=seller_username).first()
        print(seller)
        Product.objects.create(uid = uid, product_name = product_data['product_name'], product_category = product_data['product_category'],
                                base_price = product_data['base_price'], product_details = product_data['product_details'],
                                current_price = product_data['current_price'], time_to_bid = product_data['time_to_bid'], seller = seller)
        return JsonResponse(str(uid), safe = False)



@api_view(['POST'])
@csrf_exempt
def login(request):
    #return JsonResponse("Reacher Here Successfully!!" , safe=False)
    if request.method == 'POST':
        #print("at least reached destination")
        users_data=JSONParser().parse(request)
        login_serializer = LoginSerializer(data=users_data)
        if login_serializer.is_valid(): 
            temp_username = str(login_serializer['username'])
            temp_password = str(login_serializer['password'])
            username = temp_username[18:-13]
            password = temp_password[18:-13]
            #print("username is ", username, "password is ", password)
            
            user = Users.objects.filter(username=username).first()

            if user is None:
                raise AuthenticationFailed('User not found')
            elif user.isVerified==False:
                raise AuthenticationFailed('Please verifiy your account first')
            elif not check_password(password, user.password):
                raise AuthenticationFailed('Incorrect Password')
        
            payload = {
                'username' : username,
                'exp' : datetime.datetime.utcnow()+datetime.timedelta(minutes=60),
                'iat' : datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')

            response = Response()

            response.set_cookie(key='jwt', value=token, httponly=True)
            response.data = {
                'jwt': token
            }
            return response
        
        return Response({
            'messsage' : 'Serialization Error'
        })


@api_view(['GET'])
@csrf_exempt
def userView(request):
    if request.method == 'GET':
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        print(payload['username'])
        user = Users.objects.filter(username=payload['username']).first()
        serializer = UsersSerializer(user)
        return Response(serializer.data)

@api_view(['POST'])
@csrf_exempt
def logout(request):
    response = Response()
    response.delete_cookie('jwt')
    response.data = {
        'message': 'success'
    }
    return response

@csrf_exempt
def SaveFile(request):
    file=request.FILES['uploadedFile']
    file_name = default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)

@api_view(['POST'])
@csrf_exempt
def imageUpload(request):
    print("FILE NAME : " , request.data.get('file_name'))
    default_storage.save(request.data.get('file_name')+".jpg", request.FILES['image'])
    return JsonResponse("Photo Uploaded Successfully", safe = False)


@csrf_exempt
def sendProducts(request):
    if request.method == 'GET':
        products = Product.objects.all()
        #products = Product.objects.filter(isApproved = True)
        product_serializer = ProductSerializer(products, many = True)
        return JsonResponse(product_serializer.data, safe = False)

@api_view(['POST'])
@csrf_exempt
def addBid(request):
    if request.method == 'POST':
        data=JSONParser().parse(request)
        Bids.objects.create(productId = data['productId'], bidderId = data['bidderId'], bidAmount = data['bidAmount'])
        product = Product.objects.get(uid = data['productId'])
        if product:
            product.current_price = data['bidAmount']
            product.save()
            return JsonResponse("bid added successfully", safe = False)
        else :
            return JsonResponse("Product Not Found", safe = False)

@api_view(['POST'])
@csrf_exempt
def getPreviousBidsForProduct(request):
    if request.method == 'POST':
        data=JSONParser().parse(request)
        bids = Bids.objects.filter(productId = data['uid'])
        bid_serializer = BidsSerializer(bids, many = True)
        return JsonResponse(bid_serializer.data, safe = False)



@api_view(['POST'])
@csrf_exempt
def getPreviousBidsForUser(request):
    if request.method == 'POST':
        data=JSONParser().parse(request)
        bids = Bids.objects.filter(bidderId = data['username'])
        bid_serializer = BidsSerializer(bids, many = True)
        return JsonResponse(bid_serializer.data, safe = False)



@api_view(['POST'])
@csrf_exempt
def searchProduct(request):
    if request.method == 'POST':
        data=JSONParser().parse(request)
        searchData = " " + data['text'] + " " 
        products = Product.objects.filter(product_details__icontains = searchData)| Product.objects.filter(product_details__icontains = searchData )
        prooduct_serializer = ProductSerializer(products, many = True)
        return JsonResponse(prooduct_serializer.data, safe = False)
