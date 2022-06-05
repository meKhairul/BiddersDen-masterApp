from django.urls import path, re_path
from user import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    re_path(r'^register/$', views.register),
    re_path(r'^user/$', views.userView),
    re_path(r'^login/$', views.login),
    re_path(r'^logout/$', views.logout),
    path('verify/<uid>' , views.verify),
    re_path(r'^recover/$' , views.passwordRecovery),
    re_path(r'change-password/$' , views.passwordRecovery),
    re_path(r'^upload-product-info/$', views.addProduct),
    re_path(r'^imageUpload/$', views.imageUpload),
    re_path(r'^products/$', views.sendProducts),
    re_path(r'^bids/$', views.getPreviousBidsForProduct),
    re_path(r'^bidhistory/$', views.getPreviousBidsForUser),
    re_path(r'^addBid/$', views.addBid),
    re_path(r'^chat/$', views.getMessages),
    re_path(r'^message/$', views.addMessages),
    re_path(r'^searchProducts/$', views.searchProduct),
    re_path(r'^categories/$', views.getCategoricalProducts),
    re_path(r'^addEvent/$', views.addEvent),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
