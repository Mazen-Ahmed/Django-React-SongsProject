from django.db import models
from backend import settings
from django.utils import timezone

class songsCategory(models.Model):
    name=models.CharField(max_length=50)
    cover=models.ImageField(default='default-song.png',upload_to='pics')
    label=models.CharField(max_length=50,default='#e74c3c')
    def __str__(self):
        return self.name


class songs(models.Model):
    name=models.CharField(max_length=120)
    file=models.FileField(upload_to='songs')
    upload_date=models.DateTimeField(auto_now_add=True)
    uploader=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    category=models.ForeignKey(songsCategory,on_delete=models.CASCADE,blank=True,null=True)
    cover=models.ImageField(upload_to='pics',default='default-song.png')
    likes=models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True,related_name='liked_users')
    def __str__(self):
        return self.name
    def like_count(self):
        return self.likes.count()

class playlist(models.Model):
    name=models.CharField(max_length=50)
    songss=models.ManyToManyField(songs,blank=True)
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    added=models.DateTimeField(default=timezone.now)
    class Meta:
            unique_together=(
            ('name','user')
        )
    class Meta:
        ordering = ('added',)
class comments(models.Model):
    comment=models.CharField(max_length=100)
    date=models.DateTimeField(auto_now_add=True)
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    song=models.ForeignKey(songs,on_delete=models.CASCADE)
    likes=models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True,related_name='comments_likes')
    dislikes=models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True,related_name='comments_dislikes')

    class Meta:
         ordering = ('date',)
    def dislikes_count(self):
        return self.dislikes.count()
    def likes_count(self):
        return self.likes.count()
class replys(models.Model):
    reply=models.CharField(max_length=100)
    date=models.DateTimeField(auto_now_add=True)
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    comment=models.ForeignKey(comments,on_delete=models.CASCADE)
    likes=models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True,related_name='replys_likes')
    dislikes=models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True,related_name='replys_dislikes')
    def dislikes_count(self):
        return self.dislikes.count()
    def likes_count(self):
        return self.likes.count()
    class Meta:
         ordering = ('date',)
