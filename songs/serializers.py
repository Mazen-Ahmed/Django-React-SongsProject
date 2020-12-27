from .models import songs,songsCategory,comments,replys,playlist
from rest_framework import serializers
from user.serializers import UserSerializer


class string(serializers.StringRelatedField):
    def to_internal_value(self, data):
        return data

class songsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=songsCategory
        fields=['id','name','cover','label']




class replysserializer(serializers.ModelSerializer):
    user=serializers.SerializerMethodField()
    avatar=serializers.SerializerMethodField()
    date=serializers.SerializerMethodField()
    likes_count=serializers.SerializerMethodField()
    dislikes_count=serializers.SerializerMethodField()
    likes=serializers.SerializerMethodField()
    dislikes=serializers.SerializerMethodField()
    class Meta:
        model=replys
        fields=['id','reply','user','date','avatar','likes_count','dislikes_count','likes','dislikes']
    def get_user(self,obj):
        return UserSerializer(obj.user).data    
    def get_avatar(self,obj):
        serializer_data=UserSerializer(obj.user).data
        ava=serializer_data.get('avatar')
        avatar=f'http://127.0.0.1:8000{ava}'
        return avatar
    def get_date(self,obj):
        if(obj.date.hour>=00 and obj.date.hour<12):
            x='am'
        else:
            x='pm'
        return f'{obj.date.date()} at {str(obj.date.time())[:5]} {x}'    
    def get_likes_count(self,obj):
        return obj.likes_count()
    def get_dislikes_count(self,obj):
        return obj.dislikes_count()     
    def get_likes(self,obj):  
        return UserSerializer(obj.likes.all(),many=True).data
    def get_dislikes(self,obj):  
        return UserSerializer(obj.dislikes.all(),many=True).data





class commentsserializer(serializers.ModelSerializer):
    user=serializers.SerializerMethodField()
    avatar=serializers.SerializerMethodField()
    date=serializers.SerializerMethodField()
    likes_count=serializers.SerializerMethodField()
    dislikes_count=serializers.SerializerMethodField()
    likes=serializers.SerializerMethodField()
    dislikes=serializers.SerializerMethodField()
    replys=serializers.SerializerMethodField()
    class Meta:
        model=comments
        fields=['id','comment','user','date','avatar','likes_count','dislikes_count','likes','dislikes','replys']
    def get_user(self,obj):
        return UserSerializer(obj.user).data    
    def get_avatar(self,obj):
        serializer_data=UserSerializer(obj.user).data
        ava=serializer_data.get('avatar')
        avatar=f'http://127.0.0.1:8000{ava}'
        return avatar
    def get_date(self,obj):
        if(obj.date.hour>=00 and obj.date.hour<12):
            x='am'
        else:
            x='pm'
        return f'{obj.date.date()} at {str(obj.date.time())[:5]} {x}'    
    def get_likes_count(self,obj):
        return obj.likes_count()
    def get_dislikes_count(self,obj):
        return obj.dislikes_count()     
    def get_likes(self,obj):  
        return UserSerializer(obj.likes.all(),many=True).data
    def get_dislikes(self,obj):  
        return UserSerializer(obj.dislikes.all(),many=True).data
    def get_replys(self,obj):
        return replysserializer(obj.replys_set.all(),many=True).data

class songsSerializer(serializers.ModelSerializer):
    category=serializers.SerializerMethodField()
    uploader=string()
    upload_date=serializers.SerializerMethodField()
    likes_count=serializers.SerializerMethodField()
    likes=serializers.SerializerMethodField()
    comments=serializers.SerializerMethodField()
    comments_count=serializers.SerializerMethodField()

    class Meta:
        model=songs
        fields=['id','name','file','upload_date','cover','uploader','category','likes','likes_count','comments','comments_count']

    def get_category(self,obj):
        return songsCategorySerializer(obj.category).data

    def get_upload_date(self,obj):
        if(obj.upload_date.hour>=00 and obj.upload_date.hour<12):
            x='am'
        else:
            x='pm'
        return f'{obj.upload_date.date()} at {str(obj.upload_date.time())[:5]} {x}'
   
    def get_likes(self,obj):  
        return UserSerializer(obj.likes.all(),many=True).data

    def get_likes_count(self,obj):
        return obj.like_count()

    def get_comments(self,obj):
        return commentsserializer(obj.comments_set.all(),many=True).data
    
    def get_comments_count(self,obj):
        comments=0
        for i in obj.comments_set.all():
            comments+=i.replys_set.count()
        comments+=obj.comments_set.count()    
        return comments


class playlistserializer(serializers.ModelSerializer):
    songs=serializers.SerializerMethodField()
    user=string()

    class Meta:
        model=playlist
        fields=['id','name','songs','user']
    def get_songs(self,ob):    
        return songsSerializer(ob.songss.all(),many=True).data
   

class createplaylistserializer(serializers.ModelSerializer):
    class Meta:
        model=playlist
        fields=['name','user']
   


class basicSongsSerializer(serializers.ModelSerializer):
    uploader=string()
    likes_count=serializers.SerializerMethodField()
    likes=serializers.SerializerMethodField()
    cover=serializers.SerializerMethodField()
    upload_date=serializers.SerializerMethodField()
    file=serializers.SerializerMethodField()
    class Meta:
        model=songs
        fields=['id','name','file','upload_date','likes_count','likes','cover','uploader','category']

    def get_likes(self,obj):  
        return UserSerializer(obj.likes.all(),many=True).data

    def get_likes_count(self,obj):
        return obj.like_count()
    def get_cover(self,obj):
        return f'{obj.cover}'
    def get_file(self,obj):
        return f'{obj.file}'
    def get_upload_date(self,obj):
        if(obj.upload_date.hour>=00 and obj.upload_date.hour<12):
            x='am'
        else:
            x='pm'
        return f'{obj.upload_date.date()} at {str(obj.upload_date.time())[:5]} {x}'

class categorysongsserializer(serializers.ModelSerializer):
    songs=serializers.SerializerMethodField()
    class Meta:
        model=songsCategory
        fields=['id','name','songs']
    def get_songs(self,obj):
        return basicSongsSerializer(obj.songs_set.all()[:4],many=True).data



class allcategorysongsserializer(serializers.ModelSerializer):
    songs=serializers.SerializerMethodField()
    class Meta:
        model=songsCategory
        fields=['id','name','songs','label']
    def get_songs(self,obj):
        return basicSongsSerializer(obj.songs_set.all(),many=True).data        



