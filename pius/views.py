from django.shortcuts import render, redirect, get_object_or_404
from usuarios.models import User
from pius.forms import CreatePiuForm
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.views import View
from .models import Post
from django.views.generic import View
from django.core.mail import send_mail
from django.http import HttpResponseRedirect
from usuarios.views import *

# Create your views here.


class Like(View):
    def get(self, request, pk):
        post = Post.objects.get(pk=pk)
        user = User.objects.get(pk=request.user.pk)
        post.likes.add(user)
        post.save()
        return redirect('feed')


class Deslike(View):
    def get(self, request, pk):
        post = Post.objects.get(pk=pk)
        user = User.objects.get(pk=request.user.pk)
        post.likes.remove(user)
        post.save()
        return redirect('feed')


class Delete(View):
    def get(self, request, pk):
        post = Post.objects.get(pk=pk)
        post.delete()
        user= User.objects.get(pk=request.user.pk)
        user.minus_pius()
        return redirect('feed')

class LikeInProfile(View):
    def get(self, request, pk):
        post = Post.objects.get(pk=pk)
        user = User.objects.get(pk=request.user.pk)
        username = post.user.username
        post.likes.add(user)
        post.save()
        if post.user == user:   
            return redirect('profile')
        else:
            return redirect('/usuarios/profile/{}'.format(username))


class DeslikeInProfile(View):
    def get(self, request, pk):
        post = Post.objects.get(pk=pk)
        user = User.objects.get(pk=request.user.pk)
        username = post.user.username
        post.likes.remove(user)
        post.save()
        if post.user == user:
            return redirect('profile')
        else:
            return redirect('/usuarios/profile/{}'.format(username))


class DeleteInProfile(View):
    def get(self, request, pk):
        post = Post.objects.get(pk=pk)
        post.delete()
        user= User.objects.get(pk=request.user.pk)
        user.minus_pius()
        return redirect('profile')


class FeedView(View):
    login_required = True
    
    def get(self,request):
        posts=Post.objects.all().order_by("-id")
        user = User.objects.get(pk=request.user.pk)
        form = CreatePiuForm()

        context = {
            'posts': posts,
            'user': user,
            'form': form,
        }
        return render(request, 'pius/feed.html', context)

    def post(self, request):
        user = User.objects.get(pk=request.user.pk)
        form = CreatePiuForm(request.POST)
        if form.is_valid():
            piu = form.save(commit=False)
            piu.user = user
            piu.save()
            user.plus_pius()

            context = {
                'form': form,
                'user': user,
            }

            return redirect('feed')

