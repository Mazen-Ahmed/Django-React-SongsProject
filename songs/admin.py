from django.contrib import admin
from .models import songs,songsCategory,playlist,comments,replys
# Register your models here.
admin.site.register(songs)
admin.site.register(playlist)
admin.site.register(comments)
admin.site.register(replys)

admin.site.register(songsCategory)