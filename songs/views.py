from django.shortcuts import render
from .models import songs,songsCategory,playlist,comments,replys
from rest_framework.generics import ListAPIView,DestroyAPIView,RetrieveAPIView,CreateAPIView
from rest_framework.views import APIView
from user.serializers import UserSerializer
from .serializers import (songsSerializer,createplaylistserializer,
                        songsCategorySerializer,replysserializer,playlistserializer,allcategorysongsserializer,categorysongsserializer)
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from user.models import User
from rest_framework import filters
from rest_framework.status import HTTP_403_FORBIDDEN,HTTP_200_OK
import random
from django.views.decorators.cache import cache_page
from django.db.models import Q
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, JSONParser
import cloudinary.uploader


class listsongs(ListAPIView):
    serializer_class=songsSerializer
    queryset=songs.objects.all()


class listcategories(ListAPIView):
    serializer_class=songsCategorySerializer
    queryset=songsCategory.objects.all()

class uploadsong(APIView):
    

    def post(self,request):
        token=request.data.get('token',None)
        name=request.data.get('name',None)
        file=request.data.get('song',None)
        categ=request.data.get('category',None)
        
        user=Token.objects.get(key=token).user
        if songs.objects.filter(uploader=user).count()>=15:
             return Response({'message':'you have exceeded the maximum number of uploads (15 songs)'},status=HTTP_403_FORBIDDEN)

        else:
            if categ and categ != 'null':
                category=songsCategory.objects.get(id=categ)
                songs.objects.create(uploader=user,category=category,name=name,file=file)
                return Response('song uploaded successfully')

            else:
                songs.objects.create(uploader=user,name=name,file=file)
                return Response('song uploaded successfully')


class myuploads(ListAPIView):
    serializer_class=songsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name','category__name']
    def get_queryset(self):
        token=self.request.META.get('HTTP_TOKEN')
        user=Token.objects.get(key=token).user
        sons=songs.objects.filter(uploader=user).order_by('-id')
        return sons


class deleteupload(DestroyAPIView):
    serializer_class=songsSerializer
    queryset=songs.objects.all()


class setcurrent(RetrieveAPIView):
    serializer_class=songsSerializer
    queryset=songs.objects.all()


class get_similar_songs(ListAPIView):
    serializer_class=songsSerializer
    def get_queryset(self):
        listofcats=[]
        uniquecategories=[]
        similarSongs=None
        token=self.request.META.get('HTTP_TOKEN',None)
        user=Token.objects.get(key=token).user
        liked=songs.objects.filter(likes__in=[user])
        if liked.all().count()!=0:

            for i in liked:
                if i.category:
                    if i.category in uniquecategories:
                        pass
                    else:
                        uniquecategories.append(i.category)
                else:
                    uniquecategories=songsCategory.objects.all()
            sgs=songs.objects.filter(category__in=uniquecategories).exclude(uploader=user)
            print(liked.all().count())
            if sgs.count() > 3:
                final =random.sample(list(sgs), 4)
            elif sgs.count() <= 3 :
                final =random.sample(list(sgs), sgs.count())
            print(final)
            return final
        else:
            sgs=songs.objects.all().exclude(uploader=user)
            last_sgs=random.sample(list(sgs), 4)
            return last_sgs


class songliketoggle(APIView):
    def post(self,request):
        songId=request.data.get('songID',None)
        token=request.data.get('token',None)
        song=songs.objects.get(id=songId)
        user=Token.objects.get(key=token).user
        if playlist.objects.filter(name='Likes',user=user).count() > 0:
            pass
        else:
            playlist.objects.create(name='Likes',user=user)
        if user not in song.likes.all():
            song.likes.add(user)
            liked=playlist.objects.filter(name='Likes',user=user)[0]
            liked.songss.add(song)
            return Response('Song added to your likes')
        else:
            song.likes.remove(user)
            liked=playlist.objects.filter(name='Likes',user=user)[0]
            liked.songss.remove(song)
            return Response('Song removed from your likes')




class singlesong(RetrieveAPIView):
    serializer_class=songsSerializer
    queryset=songs.objects.all()


class createcomment(APIView):
    def post(self,request):
        token=request.data.get('token',None)
        id=request.data.get('id',None)
        comment=request.data.get('comment',None)
        user=Token.objects.get(key=token).user
        song=songs.objects.get(id=id)
        comments.objects.create(user=user,song=song,comment=comment)
        return Response('Comment was added successfully')


class deletecomments(DestroyAPIView):
    serializer_class=songsSerializer
    queryset=comments.objects.all()

class addreply(APIView):
     def post(self,request):
        token=request.data.get('token',None)
        reply=request.data.get('reply',None)
        comment_id=request.data.get('comment_id',None)
        comment=comments.objects.get(id=comment_id)
        user=Token.objects.get(key=token).user
        replys.objects.create(user=user,reply=reply,comment=comment)
        return Response('Reply was added successfully')

class deletereply(DestroyAPIView):
    serializer_class=replysserializer
    queryset=replys.objects.all()


class commentliketoggle(APIView):
    def post(self,request):
        token=request.data.get('token',None)
        id=request.data.get('id',None)
        comment=comments.objects.get(id=id)
        user=Token.objects.get(key=token).user
        if user in comment.dislikes.all():
            comment.dislikes.remove(user)
            comment.likes.add(user)
        elif user in comment.likes.all():
            comment.likes.remove(user)

        else:
            comment.likes.add(user)

        return Response('ok')


class commentdisliketoggle(APIView):
    def post(self,request):
        token=request.data.get('token',None)
        id=request.data.get('id',None)
        comment=comments.objects.get(id=id)
        user=Token.objects.get(key=token).user
        if user in comment.likes.all():
            comment.likes.remove(user)
            comment.dislikes.add(user)
        elif user in comment.dislikes.all():
            comment.dislikes.remove(user)
        else:
            comment.dislikes.add(user)
        return Response('ok')


class replyliketoggle(APIView):
    def post(self,request):
        token=request.data.get('token',None)
        id=request.data.get('id',None)
        reply=replys.objects.get(id=id)
        user=Token.objects.get(key=token).user
        if user in reply.dislikes.all():
            reply.dislikes.remove(user)
            reply.likes.add(user)
        elif user in reply.likes.all():
            reply.likes.remove(user)
        else:
            reply.likes.add(user)
        return Response('ok')


class replydisliketoggle(APIView):
    def post(self,request):
        token=request.data.get('token',None)
        id=request.data.get('id',None)
        reply=replys.objects.get(id=id)
        user=Token.objects.get(key=token).user
        if user in reply.likes.all():
            reply.likes.remove(user)
            reply.dislikes.add(user)
        elif user in reply.dislikes.all():
            reply.dislikes.remove(user)
        else:
            reply.dislikes.add(user)
        return Response('ok')


class lastlistned(APIView):
    def post(self,request):
        song_id=request.data.get('song_id',None)
        token=request.data.get('token',None)
        user=Token.objects.get(key=token).user
        sg=songs.objects.get(id=song_id)
        if playlist.objects.filter(user=user,name='listeninghistory').exists():
            plst=playlist.objects.filter(user=user,name='listeninghistory')[0]
            if(plst.songss.all().count() > 4 and sg not in plst.songss.all()):
                plst.songss.remove(plst.songss.order_by('-id').last())
                plst.songss.add(sg)
            elif sg in plst.songss.all():
                pass
            else:
                plst.songss.add(sg)
        else:
            playlist.objects.create(user=user,name='listeninghistory')
            plst=playlist.objects.filter(user=user,name='listeninghistory')[0]
            plst.songss.add(sg)
        return Response('added')

class getlastlistned(ListAPIView):
    serializer_class=playlistserializer
    def get_queryset(self):
        token=self.request.META.get('HTTP_TOKEN',None)
        user=Token.objects.get(key=token).user
        queryset=playlist.objects.filter(user=user,name='listeninghistory')
        return queryset


class getplaylists(ListAPIView):
    serializer_class=playlistserializer
    def get_queryset(self):
        token=self.request.META.get('HTTP_TOKEN',None)
        user=Token.objects.get(key=token).user
        queryset=playlist.objects.filter(user=user).exclude(name='listeninghistory')
        return queryset



class getplayliststoadd(ListAPIView):
    serializer_class=playlistserializer
    def get_queryset(self):
        token=self.request.META.get('HTTP_TOKEN',None)
        user=Token.objects.get(key=token).user
        queryset=playlist.objects.filter(user=user).exclude(name__in=['listeninghistory','Likes'])
        return queryset

class getCategorySongs(ListAPIView):
    serializer_class=categorysongsserializer
    def get_queryset(self):
        categs=songsCategory.objects.all()
        return categs


class getsinglecategory(RetrieveAPIView):
    serializer_class=allcategorysongsserializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['songs__name']
    queryset=songsCategory.objects.all()



class getplaylist(RetrieveAPIView):
    serializer_class=playlistserializer
    queryset=playlist.objects.all()



class createplaylist(APIView):
    def post(self,request):
        token=request.data.get('token',None)
        name=request.data.get('name',None)
        user=Token.objects.get(key=token).user
        if playlist.objects.filter(name=name,user=user).count() > 0:
            return Response({'message':'playlist already exists'},status=HTTP_403_FORBIDDEN)
        else:
            playlist.objects.create(name=name,user=user)
            return Response({'message':'playlist was created'},status=HTTP_200_OK)



class addtoplaylist(APIView):
    def post(self,request):
        song_id=request.data.get('song_id',None)
        playlist_id=request.data.get('playlist_id',None)
        sg=songs.objects.get(id=song_id)
        plst=playlist.objects.get(id=playlist_id)
        if(sg in plst.songss.all()):
            return Response({'message':'this song is already in this playlist'},status=HTTP_403_FORBIDDEN)
        else:
            plst.songss.add(sg)
            return Response(status=HTTP_200_OK)


class removeplaylist(DestroyAPIView):
    serializer_class=playlistserializer
    queryset=playlist.objects.all()



class removefromplaylist(APIView):
    def post(self,request):
        song_id=request.data.get('song_id',None)
        playlist_id=request.data.get('playlist_id',None)
        print(song_id)
        plst=playlist.objects.get(id=playlist_id)
        sg=songs.objects.get(id=song_id)
        if sg in plst.songss.all():
            plst.songss.remove(sg)
            return Response({'message':'song was deleted successfully'},status=HTTP_200_OK)
        else:
            return Response({'message':'Error'},status=HTTP_403_FORBIDDEN)



class lastreleases(ListAPIView):
    serializer_class=songsSerializer
    def get_queryset(self):
        l=[]
        token=self.request.META.get('HTTP_TOKEN',None)
        user=Token.objects.get(key=token).user
        sgs=songs.objects.all().order_by('-id').exclude(uploader=user)
        return sgs[:4]

class searchsongsusers(APIView):
    def get(self,request):
        query=request.META.get('HTTP_QUERY',None)
        if query:
            users=User.objects.all()
            sgs=songs.objects.all()
            sgs_categ=songsCategory.objects.all()

            users=users.filter(Q(username__icontains=query ) or Q(first_name__icontains=query))
            sgs=sgs.filter(Q(name__icontains=query))
            sgs_categ=sgs_categ.filter(Q(name__icontains=query))
            return JsonResponse({
                                'query':query,
                                'users':UserSerializer(instance=users,many=True).data,
                                'songs':songsSerializer(instance=sgs,many=True).data,
                                'categories':allcategorysongsserializer(instance=sgs_categ,many=True).data

                                })
        else:

            return Response({'message':'Query cannot be null'},status=HTTP_403_FORBIDDEN)
