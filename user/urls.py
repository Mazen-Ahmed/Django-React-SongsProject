from django.contrib import admin
from django.urls import path,include
from .views import (togglefollow,getfollowers,getfollowings,getprofile,profileedit,GoogleLogin
                    ,singleuser,getuserplaylists,getuseruploads,getwhotofollow)


urlpatterns = [
    path('follow/', togglefollow.as_view()),
    path('getfollowers/', getfollowers.as_view()),
    path('getfollowings/', getfollowings.as_view()),
    path('getwhotofollow/', getwhotofollow.as_view()),
    path('single/<pk>/', singleuser.as_view()),
    path('userplaylists/', getuserplaylists.as_view()),
    path('useruploads/', getuseruploads.as_view()),
    path('profile/', getprofile.as_view({'get': 'list'})),
    path('editprofile/', profileedit.as_view()),
    path('googleLogin/',GoogleLogin.as_view(),name='socialaccount_signup')
]
