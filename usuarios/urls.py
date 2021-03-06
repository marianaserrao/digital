from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('users/', views.UsersView.as_view(), name='users'),
    path('profile/<str:username>',
         views.UserProfileView.as_view(),
         name='others_profile'),
    path('follow/<int:pk>', views.Follow.as_view(), name='follow'),
    path('unrequest/<int:pk>', views.Unrequest.as_view(), name='unrequest'),
    path('unfollow/<int:pk>', views.Unfollow.as_view(), name='unfollow'),
    path('acceptFollow/<int:pk>',
         views.AcceptFollowResquest.as_view(),
         name='accept-follow'),
    path('denyFollow/<int:pk>',
         views.DenyFollowRequest.as_view(),
         name='deny-follow'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('editarperfil', views.EditProfileView.as_view(), name='editProfile'),
    path('requiredList/', views.RequiredList.as_view(), name='required_list'),
    path('emailConfirmation/',
         views.EmailConfirmation.as_view(),
         name='email_confirmation'),
    path('confirm/<str:username>',
         views.ConfirmEmail.as_view(),
         name='confirm_email'),
    path('login_redirect/',
         views.LoginRedirect.as_view(),
         name='login_redirect'),
    path('resend/<str:username>',
         views.ResendEmail.as_view(),
         name='resend_email'),
    path('changepassword/',
         views.ChangePassword.as_view(),
         name='change_password'),
    path('resetpassword/',
         views.ResetPassword.as_view(),
         name='reset-password'),
    path('resetpassword/feito/',
         views.ResetPasswordDone.as_view(),
         name='password_reset_done'),
    path('resetpassword/confirm/<uidb64>/<token>',
         views.ResetPasswordConfirm.as_view(),
         name='password_reset_confirm'),
    path('resetpassword/complete/',
         views.ResetPasswordComplete.as_view(),
         name='password_reset_complete'),
    path('logout/', views.LogoutView.as_view(), name='logout')
]