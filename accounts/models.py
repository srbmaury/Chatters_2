from django.db import models
from feed.models import post
from django.contrib.auth.models import User
from django.utils import timezone
from email.policy import default
from PIL import Image
import numpy as np

# Create your models here.

class profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile_pics', default='dafault.jpg')
    bio = models.TextField(max_length=100, blank=True)
    email_token = models.CharField(max_length=200, blank=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.username} profile'

    def save(self, *args, **kwargs):
        super(profile, self).save(*args, **kwargs)

        img = Image.open(self.image.path)

        sqrWidth = np.ceil(np.sqrt(img.size[0]*img.size[1])).astype(int)
        img_resize = img.resize((sqrWidth, sqrWidth))
        img_resize.save(self.image.path)

class UserFollowing(models.Model):
    user_id = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    followers = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)

class Notifications(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    other_user = models.ForeignKey(User, related_name='other_user', on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(post, on_delete = models.CASCADE, blank=True, null=True)
    notification = models.TextField(max_length=100, blank=True, null=True)
    datetime = models.DateTimeField(default=timezone.now)