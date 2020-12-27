from django.db import models
from django.contrib.auth.models import AbstractUser
from backend import settings
from songs.models import songs

types=(('Normal', 'Normal'),
       ('Creator', 'Creator'),
       ('Premium', 'Premium'),
      )
class User(AbstractUser):
    username=models.CharField(max_length=200,unique=False)
    user_type=models.CharField(max_length=30,default='Normal',choices=types)
    avatar=models.ImageField(default='default-user-icon.jpg',upload_to='pics')
    followers=models.ManyToManyField('self',blank=True,related_name='followerss',symmetrical=False)
    following=models.ManyToManyField('self',blank=True,related_name='followings',symmetrical=False)
    def followers_count(self):
        return self.followers.count()
    def following_count(self):
        return self.following.count()
    def __str__(self):
        return self.username


