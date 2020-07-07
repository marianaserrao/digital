from django.contrib import admin
from .models import Post
from usuarios.models import User

#Register your models here.

class PostAdmin(admin.ModelAdmin):
    list_display= ['user','id', 'content']
    search_fields= ['user','id', 'content']

admin.site.register(Post, PostAdmin)