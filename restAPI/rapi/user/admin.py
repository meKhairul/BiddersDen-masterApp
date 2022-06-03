
from django.contrib import admin
from user.models import Bids

from user.models import Users, Product, Messages

# Register your models here.

admin.site.register(Users)
admin.site.register(Product)
admin.site.register(Bids)
admin.site.register(Messages)