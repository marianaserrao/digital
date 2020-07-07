from django.shortcuts import render, redirect
from usuarios.models import User
from django.views import View

# Create your views here.

class LandingPage(View):
  def get(self, request):
        users = User.objects.all()
        if request.user in users.all():
            return redirect('feed')
        else:
            return redirect('login')