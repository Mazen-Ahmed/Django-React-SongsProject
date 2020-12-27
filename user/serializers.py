from rest_framework import serializers
from .models import User
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from rest_framework.authtoken.models import Token

class string(serializers.StringRelatedField):
    def to_internal_value(self, data):
        return data




class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','email','id','avatar']


class UserSerializer(serializers.ModelSerializer):
    followers_count=serializers.SerializerMethodField()
    following_count=serializers.SerializerMethodField()
    followers=serializers.SerializerMethodField()
    class Meta:
        model=User
        fields=['username','email','id','password','avatar','is_superuser','is_staff','first_name',
                'user_type','followers','following','followers_count','following_count']
    def get_followers_count(self,obj):
        return obj.followers_count()

    def get_following_count(self,obj):
        return obj.following_count()
    def get_followers(self,obj):
        return CurrentUserSerializer(obj.followers.all(),many=True).data

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['avatar']

class UserRegisterationSerializer(RegisterSerializer):
    username=serializers.CharField()
   
    class Meta:
        model=User
        fields=['username','email','password']

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
           
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.username=self.cleaned_data.get('username')
        user.save()
        adapter.save_user(request, user, self)

        return user

class TokenSerializer(serializers.ModelSerializer):
    user_type=serializers.SerializerMethodField()
    username=serializers.SerializerMethodField()
    avatar=serializers.SerializerMethodField()
    email=serializers.SerializerMethodField()
    class Meta:
        model=Token
        fields=('key','user','user_type','username','avatar','email')
    def get_username(self,obj):
        serializer_data=UserSerializer(obj.user).data
        if(serializer_data.get('username') == ''):
            username=serializer_data.get('first_name')
            return username
        else:    
            username=serializer_data.get('username')
            return username
    def get_avatar(self,obj):
        serializer_data=UserSerializer(obj.user).data
        ava=serializer_data.get('avatar')
        avatar=f'https://django-react-music.herokuapp.com{ava}'
        return avatar
    def get_email(self,obj):
        serializer_data=UserSerializer(obj.user).data
        email=serializer_data.get('email')
        return email
            
    def get_user_type(self,obj):
        serializer_data=UserSerializer(obj.user).data
        user_type=serializer_data.get('user_type')
        return user_type
