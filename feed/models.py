from email.policy import default
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class post(models.Model):
    image = models.ImageField(upload_to='posts', blank=False, default='../static/image/default.png')
    caption = models.TextField(max_length=100, default='')
    datetime = models.DateTimeField(default=timezone.now)
    uname = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, related_name='likes', blank=True)
    saved = models.ManyToManyField(User, related_name='saved', blank=True)
    def total_likes(self):
        return self.likes.count()

class Problem(models.Model):
    uname = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    text = models.TextField(max_length=400)
    image = models.ImageField(upload_to='problems', null = True)
