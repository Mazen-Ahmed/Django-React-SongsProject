from django.contrib import admin
from django.urls import path,include
from .views import (listsongs,listcategories,uploadsong,myuploads,songliketoggle,getplaylist,addtoplaylist,lastreleases,
                    createcomment,deletecomments,commentliketoggle,commentdisliketoggle,getlastlistned,removefromplaylist,removeplaylist,
                    get_similar_songs,deleteupload,setcurrent,get_similar_songs,deletereply,getsinglecategory,createplaylist,
                    addreply,searchsongsusers,replyliketoggle,getplayliststoadd,replydisliketoggle,lastlistned,singlesong,getplaylists,getCategorySongs)


urlpatterns = [
    path('', listsongs.as_view()),
    path('categories/',listcategories.as_view()),
    path('upload/',uploadsong.as_view()),
    path('myuploads/',myuploads.as_view()),
    path('setcurrent/<pk>/',setcurrent.as_view()),
    path('upload/<pk>/',deleteupload.as_view()),
    path('togglelikes/',songliketoggle.as_view()),
    path('suggestions/',get_similar_songs.as_view()),
    path('song/<pk>/',singlesong.as_view()),
    path('comment/',createcomment.as_view()),
    path('commentdelete/<pk>',deletecomments.as_view()),
    path('reply/',addreply.as_view()),
    path('replydelete/<pk>',deletereply.as_view()),
    path('commentliketoggle/',commentliketoggle.as_view()),
    path('commentdisliketoggle/',commentdisliketoggle.as_view()),
    path('replyliketoggle/',replyliketoggle.as_view()),
    path('replydisliketoggle/',replydisliketoggle.as_view()),
    path('lastlistened/',lastlistned.as_view()),
    path('getlastlistened/',getlastlistned.as_view()),
    path('getplaylists/',getplaylists.as_view()),

    path('getplayliststoadd/',getplayliststoadd.as_view()),
    
    path('addplaylist/',createplaylist.as_view()),
    path('addtoplaylist/',addtoplaylist.as_view()),
    path('removefromplaylist/',removefromplaylist.as_view()),
    path('removeplaylist/<pk>/',removeplaylist.as_view()),
    path('getcategorysongs/',getCategorySongs.as_view()),
    path('category/<pk>/',getsinglecategory.as_view()),
    path('getplaylist/<pk>/',getplaylist.as_view()),
    path('lastreleases/',lastreleases.as_view()),
    path('searchsongsusers/',searchsongsusers.as_view()),
]
