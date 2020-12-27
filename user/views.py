from django.shortcuts import render
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

from .models import User
from songs.models import playlist,songs,songsCategory
from songs.serializers import songsSerializer,playlistserializer
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView,RetrieveAPIView,UpdateAPIView
from rest_framework import viewsets
from .serializers import UserSerializer,UserUpdateSerializer
import random

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = 'http://localhost:8000/accounts/google/login/callback/'


class togglefollow(APIView):
    def post(self,request):
        token=request.data.get('token',None)
        user_id=request.data.get('id',None)
        print(token,user_id)
        user1=Token.objects.get(key=token).user
        user2=User.objects.get(id=user_id)
        if(user1 in user2.followers.all()):
            user2.followers.remove(user1)
            user1.following.remove(user2)
            return Response('unfollowed')
        else:
            user2.followers.add(user1)
            user1.following.add(user2)    
            return Response('followed')


class getfollowers(ListAPIView):
    serializer_class=UserSerializer
    def get_queryset(self):
        token=self.request.META.get('HTTP_TOKEN',None)
        user=Token.objects.get(key=token).user
        followers=user.followers.all()
        return followers




class getfollowings(ListAPIView):
    serializer_class=UserSerializer
    def get_queryset(self):
        token=self.request.META.get('HTTP_TOKEN',None)
        user=Token.objects.get(key=token).user
        followers=user.following.all()
        return followers


class getwhotofollow(ListAPIView):
    serializer_class=UserSerializer
    def get_queryset(self):
        l=[]
        userslist=[]
        token=self.request.META.get('HTTP_TOKEN',None)
        user=Token.objects.get(key=token).user
        liked=songs.objects.filter(likes__in=[user])   
        if(liked.all().count()>0):
            plst=playlist.objects.filter(user=user,name='Likes')[0]
            liked=plst.songss.all()
            for i in liked:
                if i.category:
                    l.append(i.category)
                else:
                    l=songsCategory.objects.all()
            sgs=songs.objects.filter(category__in=l).exclude(uploader=user)
            for i in sgs:
                if i.uploader in userslist:
                    pass
                else:
                    userslist.append(i.uploader)
        else:
            users=User.objects.all().exclude(username=user.username)
            userslist=random.sample(list(users), 4)
        return userslist     


class singleuser(RetrieveAPIView):
    serializer_class=UserSerializer
    queryset=User.objects.all()


class getuserplaylists(ListAPIView):
    serializer_class=playlistserializer
    def get_queryset(self):
        id=self.request.META.get('HTTP_ID',None)
        print(id)
        user=User.objects.get(id=id)
        plsts=playlist.objects.filter(user=user).exclude(name='listeninghistory')
        return plsts

class getuseruploads(ListAPIView):
    serializer_class=songsSerializer
    def get_queryset(self):
        id=self.request.META.get('HTTP_ID',None)
        print(id)
        user=User.objects.get(id=id)
        sgs=songs.objects.filter(uploader=user)
        return sgs        

'''
class getprofile(RetrieveAPIView):
    serializer_class=UserSerializer
    def get_queryset(self):
        token=self.request.META.get('HTTP_TOKEN',None)
        queryset=Token.objects.get(key=token).user
        return queryset       

'''
class getprofile(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        if self.action == 'list':
            return self.queryset.filter(username=self.request.user)
        return self.queryset


class profileedit(APIView):
    def post(self,request):
        token=request.data.get('token',None)
        avatar=request.data.get('avatar',None)
        print(avatar)
        user=Token.objects.get(key=token).user
        user.avatar=avatar
        user.save()
        return Response('ok') 

