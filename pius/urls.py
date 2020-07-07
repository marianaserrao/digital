from django.urls import path
from . import views

urlpatterns = [
    path('feed/', views.FeedView.as_view(), name='feed'),
    path('like/<int:pk>', views.Like.as_view(), name='likes'),
    path('deslike/<int:pk>', views.Deslike.as_view(), name='deslike'),
    path('delete/<int:pk>', views.Delete.as_view(), name='delete'),
    path('likeinprofile/<int:pk>', views.LikeInProfile.as_view(), name='profile_likes'),
    path('deslikeinprofile/<int:pk>', views.DeslikeInProfile.as_view(), name='profile_deslike'),
    path('deleteinprofile/<int:pk>', views.DeleteInProfile.as_view(), name='profile_delete'),
]