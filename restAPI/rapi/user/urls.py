from django.urls import path, re_path
from user import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    #user
    re_path(r'^register/$', views.register),
    re_path(r'^user/$', views.userView),
    re_path(r'^login/$', views.login),
    re_path(r'^logout/$', views.logout),
    path('verify/<uid>' , views.verify),
    re_path(r'^recover/$' , views.recovery),
    re_path(r'^loginWithCode/$' , views.loginWithRecoveryCode),
    re_path(r'^change-password/$' , views.changePassword),
    re_path(r'^updateUser/$' , views.updateUser),

    #product
    re_path(r'^upload-product-info/$', views.addProduct),
    re_path(r'^imageUpload/$', views.imageUpload),
    re_path(r'^products/$', views.sendProducts),
    re_path(r'^categories/$', views.getCategoricalProducts),
    re_path(r'^searchProducts/$', views.searchProduct),
    re_path(r'^productDetails/$', views.productDetails),

    #bid
    re_path(r'^bids/$', views.getPreviousBidsForProduct),
    re_path(r'^bidhistory/$', views.getPreviousBidsForUser),
    re_path(r'^addBid/$', views.addBid),

    #event
    re_path(r'^addEvent/$', views.addEvent),
    
    #chat
    re_path(r'^chat/$', views.getMessages),
    re_path(r'^message/$', views.message),

    #admin
    re_path(r'^updateProduct/$', views.updateProduct),
    re_path(r'^ban/$', views.banUser),
    re_path(r'^users/$', views.getAllUsers),

    #recommendation
    re_path(r'^initRecommendations/$', views.generateRecommendation),
    re_path(r'^recommend/$', views.gg),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
