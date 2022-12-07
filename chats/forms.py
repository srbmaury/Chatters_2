from django import forms
from .models import Chat

class NewMessageForm(forms.ModelForm):
    class Meta:
        model = Chat
        fields = ['sender', 'receiver', 'text']
