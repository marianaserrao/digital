from django.db import models
from usuarios.models import User
from django.conf import settings
from datetime import date
User = settings.AUTH_USER_MODEL

class Post(models.Model):
    content = models.CharField(max_length=140)
    date = models.DateField(auto_now=True, editable=False)
    likes = models.ManyToManyField(User, blank=True, related_name= "curtiram")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.content

    def like_numbers(self):
        like_numbers = self.likes.count()
        return like_numbers

