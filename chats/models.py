from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Chat(models.Model):
    sender = models.ForeignKey(User, blank=True, related_name="sender", on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, blank=True, related_name="receiver", on_delete=models.CASCADE)
    text = models.TextField(max_length=3000, blank=True)