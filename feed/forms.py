# forms.py
from django import forms
from .models import *
  
class ProblemForm(forms.ModelForm):
    class Meta:
        model = Problem
        image = forms.ImageField(required=True)
        fields = ['text', 'image']

class postCreateForm(forms.ModelForm):
    class Meta:
        model = post
        image = forms.ImageField(required=True)
        fields = ['image', 'caption']