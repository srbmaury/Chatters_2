from django.contrib import admin
from .models import Notifications, UserFollowing, profile
# Register your models here.
admin.site.register(profile)
admin.site.register(UserFollowing)
admin.site.register(Notifications)