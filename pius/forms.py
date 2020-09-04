from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, AuthenticationForm
from .models import Post
from usuarios.models import User
from django.forms import ModelForm


# Forms do Piu
class CreatePiuForm(forms.ModelForm):
    content = forms.CharField(
        max_length=140,
        widget=forms.Textarea(attrs={'placehoder': 'Digite seu Piu'}))

    class Meta:
        model = Post
        fields = ['content']

#mari
