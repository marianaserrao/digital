from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.contrib.auth import views as auth_views
from django.contrib.auth import logout
from django.contrib.auth.forms import PasswordChangeForm
from django.urls import reverse_lazy
from django.views import View
from django.db.models.functions import Lower
from pius.models import *
from .forms import *
from .models import *
from django.core.mail import send_mail


class RegisterView(View):
    def get(self, request, *args, **kwargs):
        form = CreateUserForm()
        return render(request, 'usuarios/register.html', {'form': form})

    def post(self, request, *args, **kwargs):
        form = CreateUserForm(request.POST)
        if form.is_valid():
            name = str(form['name'].value())
            subject = 'Finalizando seu cadastro Piupiuwer!'
            message = 'Olá {},\n \n Confirme seu email clicando no link: http://127.0.0.1:8000/usuarios/emailConfirmation'.format(
                name)
            recepient = str(form['email'].value())
            User.send_email(self, subject, message, recepient)
            form.save()
            return redirect('login')
        else:
            print(form.errors)
        return render(request, 'usuarios/register.html', {'form': form})


class LoginView(auth_views.LoginView):
    template_name = 'usuarios/login.html'
    form = LoginUserForm


class UsersView(View):
    login_required = True

    def get(self, request):
        users = User.objects.all().order_by(Lower("name"))
        usuario = User.objects.get(pk=request.user.pk)

        context = {
            'users': users,
            'usuario': usuario,
        }
        return render(request, 'usuarios/users.html', context)


class Follow(View):
    def get(self, request, pk):
        user_followed = User.objects.get(pk=pk)
        user_requesting = User.objects.get(pk=request.user.pk)

        if user_followed.isOpened:
            user_followed.followers.add(user_requesting)
            user_requesting.following.add(user_followed)
        else:
            user_followed.follow_requests.add(user_requesting)
        user_followed.save()
        return redirect('users')


class Unrequest(View):
    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        usuario = User.objects.get(pk=request.user.pk)
        user.follow_requests.remove(usuario)
        user.save()
        return redirect('users')


class Unfollow(View):
    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        usuario = User.objects.get(pk=request.user.pk)
        user.followers.remove(usuario)
        usuario.following.remove(user)
        user.save()
        return redirect('users')


class AcceptFollowResquest(View):
    def get(self, request, pk):
        acceptedUser = User.objects.get(pk=pk)
        acceptingUser = User.objects.get(pk=request.user.pk)

        acceptingUser.followers.add(acceptedUser)
        acceptingUser.follow_requests.remove(acceptedUser)
        acceptedUser.following.add(acceptingUser)

        acceptingUser.save()
        return redirect('profile')


class DenyFollowRequest(View):
    def get(self, request, pk):
        deniedUser = User.objects.get(pk=pk)
        denyingUser = User.objects.get(pk=request.user.pk)

        denyingUser.follow_requests.remove(deniedUser)

        denyingUser.save()
        return redirect('profile')


class ProfileView(View):
    def get(self, request, *args, **kwargs):
        user = User.objects.get(pk=request.user.pk)
        pius = Post.objects.filter(user=user)

        return render(request, 'usuarios/profile.html', {
            'pius': pius,
            'user': request.user,
            'usuario': user,
            'myProfile': True,
        })


class EditProfileView(View):
    def get(self, request, *args, **kwargs):
        form = UpdateUserForm(instance=request.user)
        args = {'form': form}

        return render(request, 'usuarios/editProfile.html', args)

    def post(self, request, *args, **kwargs):
        form = UpdateUserForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('feed')
        else:
            print(form.errors)
            return render(request, 'usuarios/editProfile.html', {'form': form})


class UserProfileView(View):
    def get(self, request, username):
        user = User.objects.get(username=username)
        usuario = User.objects.get(pk=request.user.pk)

        if user == request.user:
            return redirect('profile')

        followList = user.followers.all()
        isAllowed = None

        if user.isOpened:
            pius = Post.objects.filter(user=user)
            isAllowed = True
        elif request.user in followList:
            pius = Post.objects.filter(user=user)
            isAllowed = True
        else:
            pius = ()
            isAllowed = False

        return render(request, 'usuarios/profile.html', {
            'pius': pius,
            'user': user,
            'myProfile': False,
            'isAllowed': isAllowed,
            'usuario': usuario,
        })


class RequiredList(View):
    def get(self, request):
        user = User.objects.get(pk=request.user.pk)
        requests = user.follow_requests.all()

        return render(request, 'usuarios/requests.html', {
            'user': user,
            'requests': requests,
        })


class EmailConfirmation(View):
    def get(self, request):
        print('aqui')
        print(request)
        user = User.objects.get(pk=request.user.pk)

        return render(request, 'usuarios/emailConfirmation.html', {
            'user': user,
        })


class ConfirmEmail(View):
    def get(self, request, username):
        user = User.objects.get(pk=request.user.pk)
        user.emailConfirmed = True
        user.save()
        return redirect('feed')


class LoginRedirect(View):
    def get(self, request):
        user = User.objects.get(pk=request.user.pk)
        if user.emailConfirmed == True:
            return redirect('feed')
        else:
            return render(request, 'usuarios/notConfirmed.html', {
                'user': user,
            })


class ResendEmail(View):
    def get(self, request, username):
        user = User.objects.get(pk=request.user.pk)
        name = user.name
        subject = 'Finalizando seu cadastro Piupiuwer!'
        message = 'Olá {},\n \n Confirme seu email clicando no link: http://127.0.0.1:8000/usuarios/emailConfirmation'.format(
            name)
        recepient = user.email
        User.send_email(self, subject, message, recepient)

        return redirect('login_redirect')


class ChangePassword(View):
    def get(self, request, *args, **kwargs):
        form = PasswordChangeForm(user=request.user)
        args = {'form': form}

        return render(request, 'usuarios/change_password.html', args)

    def post(self, request, *args, **kwargs):
        form = PasswordChangeForm(data=request.POST, user=request.user)
        if form.is_valid():
            form.save()
            return redirect('login')
        else:
            args = {'form': form}
            return render(request, 'usuarios/change_password.html', args)


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('login')


class ResetPassword(auth_views.PasswordResetView):
    template_name = 'usuarios/reset_password.html'
    success_url = 'feito/'


class ResetPasswordDone(auth_views.PasswordResetDoneView):
    template_name = 'usuarios/reset_password_done.html'


class ResetPasswordConfirm(auth_views.PasswordResetConfirmView):
    template_name = 'usuarios/reset_password_confirm.html'
    success_url = '../../complete/'


class ResetPasswordComplete(auth_views.PasswordResetCompleteView):
    template_name = 'usuarios/reset_password_complete.html'
