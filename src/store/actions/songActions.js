import axios from 'axios'
export const GET_SONGS_START='getSongsStart'
export const GET_SONGS_SUCCESS='getSongsSuccess'
export const GET_SONGS_FAILED='getSongsFailed'
export const GET_SINGLE_SONG_START='getSingleSongStart'
export const GET_SINGLE_SONG_SUCCESS='getSingleSongSuccess'
export const GET_SINGLE_SONG_FAILED='getSingleSongFailed'
export const GET_CATEGORIES_SUCCESS='getCategoriesSuccess'
export const GET_CATEGORIES_FAILED='getCategoriesFailed'
export const GET_MY_UPLOADS_START='getMyUploadsStart'
export const GET_MY_UPLOADS_SUCCESS='getMyUploadsSuccess'
export const GET_MY_UPLOADS_FAILED='getMyUploadsFailed'
export const UPLOAD_SONGS_START='uploadSongsStart'
export const UPLOAD_SONGS_SUCCESS='uploadSongsSuccess'
export const UPLOAD_SONGS_FAILED='uploadSongsFailed'
export const SEARCH_UPLOADS_START='searchUploadsStart'
export const SEARCH_UPLOADS_SUCCESS='searchUploadsSuccess'
export const SEARCH_UPLOADS_FAILED='searchUploadsFailed'
export const SEARCH_CATEGORY_SONGS_START='searchCategorySongsStart'
export const SEARCH_CATEGORY_SONGS_SUCCESS='searchCategorySongsSuccess'
export const SEARCH_CATEGORY_SONGS_FAILED='searchCategorySongsFailed'
export const DELETE_UPLOADS_START='deleteUploadsStart'
export const DELETE_UPLOADS_SUCCESS='deleteUploadsSuccess'
export const DELETE_UPLOADS_FAILED='deleteUploadsFailed'
export const DELETE_COMMENTS_START='deleteCommentsStart'
export const DELETE_COMMENTS_SUCCESS='deleteCommentsSuccess'
export const DELETE_COMMENTS_FAILED='deleteCommentsFailed'
export const DELETE_REPLY_START='deleteReplysStart'
export const DELETE_REPLY_SUCCESS='deleteReplysSuccess'
export const DELETE_REPLY_FAILED='deleteReplysFailed'
export const GET_SONG_SUGGESTIONS_START='getSongSuggestionsStart'
export const GET_SONG_SUGGESTIONS_SUCCESS='getSongSuggestionsSuccess'
export const GET_SONG_SUGGESTIONS_FAILED='getSongSuggestionsFailed'
export const ADD_COMMENT_START='addCommentStart'
export const ADD_COMMENT_SUCCESS='addCommentSuccess'
export const ADD_COMMENT_FAILED='addCommentFailed'
export const ADD_REPLY_START='addReplyStart'
export const ADD_REPLY_SUCCESS='addReplySuccess'
export const ADD_REPLY_FAILED='addReplyFailed'
export const LIKE_TOGGLE='likeToggle'
export const COMMENT_LIKE='commentLikeSuccess'
export const COMMENT_DISLIKE='commentDislikeSuccess'
export const REPLY_LIKE_SUCCESS='replyLikeSuccess'
export const REPLY_DISLIKE_SUCCESS='replyDislikeSuccess'
export const GET_PLAYLISTS_START='getPlaylistsStart'
export const GET_PLAYLISTS_SUCCESS='getPlaylistsSuccess'
export const GET_PLAYLISTS_FAILED='getPlaylistsFailed'
export const GET_PLAYLISTS_TO_ADD_START='getPlaylistsToAddStart'
export const GET_PLAYLISTS_TO_ADD_SUCCESS='getPlaylistsToAddSuccess'
export const GET_PLAYLISTS_TO_ADD_FAILED='getPlaylistsToAddFailed'
export const ADD_PLAYLIST_START='addPlaylistStart'
export const ADD_PLAYLIST_SUCCESS='addPlaylistSuccess'
export const ADD_PLAYLIST_FAILED='addPlaylistFailed'
export const GET_WHOTOFOLLOW_START='getWhotofollowStart'
export const GET_WHOTOFOLLOW_SUCCESS='getWhotofollowSuccess'
export const GET_WHOTOFOLLOW_FAILED='getWhotofollowFailed'
export const TOGGLE_FOLLOW='toggleFollow'
export const GET_CATEGORY_SONGS_START='getCategorySongsStart'
export const GET_CATEGORY_SONGS_SUCCESS='getCategorySongsSuccess'
export const GET_CATEGORY_START='getCategoryStart'
export const GET_CATEGORY_SUCCESS='getCategorySuccess'
export const GET_PLAYLIST_START='getPlaylistStart'
export const GET_PLAYLIST_SUCCESS='getPlaylistSuccess'
export const AFTER_LIKE='afterLike'
export const ADD_TO_PLAYLIST_START='addToPlaylistStart'
export const ADD_TO_PLAYLIST_SUCCESS='addToPlaylistSuccess'
export const ADD_TO_PLAYLIST_FAILED='addToPlaylistFailed'
export const REMOVE_FROM_PLAYLIST_START='removeFromPlaylistStart'
export const REMOVE_FROM_PLAYLIST_SUCCESS='removeFromPlaylistSuccess'
export const REMOVE_FROM_PLAYLIST_FAILED='removeFromPlaylistFailed'
export const REMOVE_PLAYLIST_START='removePlaylistStart'
export const REMOVE_PLAYLIST_SUCCESS='removePlaylistSuccess'
export const REMOVE_PLAYLIST_FAILED='removePlaylistFailed'
export const GET_LAST_RELEASES_START='getLastReleasesStart'
export const GET_LAST_RELEASES_SUCCESS='getLastReleasesSuccess'
export const GET_LAST_RELEASES_FAILED='getLastReleasesFailed'
export const SEARCH_ALL_START='searchAllStart'
export const SEARCH_ALL_SUCCESS='searchAllSuccess'
export const SEARCH_ALL_FAILED='searchAllFailed'
export const GET_PROGRESS='getProgress'

export const afterLike=()=>{
    return {
        type:AFTER_LIKE,
        message:null
    }
}



export const searchAllStart=()=>{
    return{
        type:SEARCH_ALL_START
    }
}
export const searchAllSuccess=(results)=>{
    return{
        type:SEARCH_ALL_SUCCESS,
        results
    }
}
export const searchAllFailed=(error)=>{
    return{
        type:SEARCH_ALL_FAILED,
        error
    }
}





export const likeToggle=(message)=>{
    return{
        type:LIKE_TOGGLE,
        message
    }
}


export const followToggle=(message)=>{
    return{
        type:TOGGLE_FOLLOW,
        message
    }
}


export const getCategorySongsStart=()=>{
    return{
        type:GET_CATEGORY_SONGS_START
    }
}
export const getCategorySongsSuccess=(songs)=>{
    return{
        type:GET_CATEGORY_SONGS_SUCCESS,
        songs
    }
}



export const getPlaylistStart=()=>{
    return{
        type:GET_PLAYLIST_START
    }
}
export const getPlaylistSuccess=(playlist)=>{
    return{
        type:GET_PLAYLIST_SUCCESS,
        playlist
    }
}


export const getCategoryStart=()=>{
    return{
        type:GET_CATEGORY_START
    }
}
export const getCategorySuccess=(category)=>{
    return{
        type:GET_CATEGORY_SUCCESS,
        category
    }
}


export const getWhotofollowStart=()=>{
    return{
        type:GET_WHOTOFOLLOW_START
    }
}
export const getWhotofollowSuccess=(users)=>{
    return{
        type:GET_WHOTOFOLLOW_SUCCESS,
        users
    }
}
export const getWhotofollowFailed=(error)=>{
    return{
        type:GET_WHOTOFOLLOW_FAILED,
        error
    }
}





export const getLastReleasesStart=()=>{
    return{
        type:GET_LAST_RELEASES_START
    }
}
export const getLastReleasesSuccess=(songs)=>{
    return{
        type:GET_LAST_RELEASES_SUCCESS,
        songs
    }
}
export const getLastReleasesFailed=(error)=>{
    return{
        type:GET_LAST_RELEASES_FAILED,
        error
    }
}





export const getCategoriesFailed=(error)=>{
    return{
        type:GET_CATEGORIES_FAILED,
        error   
    }
}
export const getCategoriesSuccess=(categories)=>{
    return{
        type:GET_CATEGORIES_SUCCESS,
        categories
    }
}


export const getPlaylistsStart=()=>{
    return{
        type:GET_PLAYLISTS_START
    }
}
export const getPlaylistsSuccess=(playlists)=>{
    return{
        type:GET_PLAYLISTS_SUCCESS,
        playlists
    }
}
export const getPlaylistsFailed=(error)=>{
    return{
        type:GET_PLAYLISTS_FAILED,
        error
    }
}



export const getPlaylistsToAddStart=()=>{
    return{
        type:GET_PLAYLISTS_TO_ADD_START
    }
}
export const getPlaylistsToAddSuccess=(playlists)=>{
    return{
        type:GET_PLAYLISTS_TO_ADD_SUCCESS,
        playlists
    }
}
export const getPlaylistsToAddFailed=(error)=>{
    return{
        type:GET_PLAYLISTS_TO_ADD_FAILED,
        error
    }
}



export const addToPlaylistStart=()=>{
    return{
        type:ADD_TO_PLAYLIST_START
    }
}
export const addToPlaylistSuccess=(message)=>{
    return{
        type:ADD_TO_PLAYLIST_SUCCESS,
        message
    }
}
export const addToPlaylistFailed=(error)=>{
    return{
        type:ADD_TO_PLAYLIST_FAILED,
        error
    }
}


export const removeFromPlaylistStart=()=>{
    return{
        type:REMOVE_FROM_PLAYLIST_START
    }
}
export const removeFromPlaylistSuccess=(message)=>{
    return{
        type:REMOVE_FROM_PLAYLIST_SUCCESS,
        message
    }
}
export const removeFromPlaylistFailed=(error)=>{
    return{
        type:REMOVE_FROM_PLAYLIST_FAILED,
        error
    }
}


export const removePlaylistStart=()=>{
    return{
        type:REMOVE_PLAYLIST_START
    }
}
export const removePlaylistSuccess=(message)=>{
    return{
        type:REMOVE_PLAYLIST_SUCCESS,
        message
    }
}
export const removePlaylistFailed=(error)=>{
    return{
        type:REMOVE_PLAYLIST_FAILED,
        error
    }
}





export const addPlaylistsStart=()=>{
    return{
        type:ADD_PLAYLIST_START
    }
}
export const addPlaylistsSuccess=(success)=>{
    return{
        type:ADD_PLAYLIST_SUCCESS,
        success
    }
}
export const addPlaylistsFailed=(error)=>{
    return{
        type:ADD_PLAYLIST_FAILED,
        error
    }
}


export const getSongSuggestionsStart=()=>{
    return{
        type:GET_SONG_SUGGESTIONS_START
    }
}
export const getSongSuggestionsSuccess=(songs)=>{
    return{
        type:GET_SONG_SUGGESTIONS_SUCCESS,
        songs
    }
}
export const getSongSuggestionsFailed=(error)=>{
    return{
        type:GET_SONG_SUGGESTIONS_FAILED,
        error
    }
}




export const addReplyStart=()=>{
    return{
        type:ADD_REPLY_START
    }
}
export const addReplySuccess=(message)=>{
    return{
        type:ADD_REPLY_SUCCESS,
        message
    }
}
export const addReplyFailed=(error)=>{
    return{
        type:ADD_REPLY_FAILED,
        error
    }
}





export const addcommentStart=()=>{
    return{
        type:ADD_COMMENT_START
    }
}
export const addcommentSuccess=(message)=>{
    return{
        type:ADD_COMMENT_SUCCESS,
        message
    }
}
export const addcommentFailed=(error)=>{
    return{
        type:ADD_COMMENT_FAILED,
        error
    }
}


export const deletecommentSuccess=(message)=>{
    return{
        type:DELETE_COMMENTS_SUCCESS,
        message
    }
}
export const deletecommentFailed=(error)=>{
    return{
        type:DELETE_COMMENTS_FAILED,
        error
    }
}




export const deleteReplyStart=()=>{
    return{
        type:DELETE_REPLY_START
    }
}
export const deleteReplySuccess=(message)=>{
    return{
        type:DELETE_REPLY_SUCCESS,
        message
    }
}
export const deleteReplyFailed=(error)=>{
    return{
        type:DELETE_REPLY_FAILED,
        error
    }
}



export const getSongsStart=()=>{
    return{
        type:GET_SONGS_START
    }
}
export const getSongsSuccess=(songs)=>{
    return{
        type:GET_SONGS_SUCCESS,
        songs
    }
}
export const getSongsFailed=(error)=>{
    return{
        type:GET_SONGS_FAILED,
        error
    }
}






export const getSingleSongStart=()=>{
    return{
        type:GET_SINGLE_SONG_START
    }
}
export const getSingleSongSuccess=(song)=>{
    return{
        type:GET_SINGLE_SONG_SUCCESS,
        song
    }
}
export const getSingleSongFailed=(error)=>{
    return{
        type:GET_SINGLE_SONG_FAILED,
        error
    }
}





export const getMyUploadsStart=()=>{
    return{
        type:GET_MY_UPLOADS_START
    }
}
export const getMyUploadsSuccess=(songs)=>{
    return{
        type:GET_MY_UPLOADS_SUCCESS,
        songs
    }
}
export const getMyUploadsFailed=(error)=>{
    return{
        type:GET_MY_UPLOADS_FAILED,
        error
    }
}





export const searchUploadsStart=()=>{
    return{
        type:SEARCH_UPLOADS_START
    }
}
export const searchUploadsSuccess=(songs)=>{
    return{
        type:SEARCH_UPLOADS_SUCCESS,
        songs
    }
}
export const searchUploadsFailed=(error)=>{
    return{
        type:SEARCH_UPLOADS_FAILED,
        error
    }
}





export const searchCategorySongsStart=()=>{
    return{
        type:SEARCH_CATEGORY_SONGS_START
    }
}
export const searchCategorySongsSuccess=(songs)=>{
    return{
        type:SEARCH_CATEGORY_SONGS_SUCCESS,
        songs
    }
}
export const searchCategorySongsFailed=(error)=>{
    return{
        type:SEARCH_CATEGORY_SONGS_FAILED,
        error
    }
}





export const deleteUploadStart=()=>{
    return{
        type:DELETE_UPLOADS_START
    }
}
export const deleteUploadSuccess=(message)=>{
    return{
        type:DELETE_UPLOADS_SUCCESS,
        message
    }
}
export const deleteUploadFailed=(error)=>{
    return{
        type:DELETE_UPLOADS_FAILED,
        error
    }
}



export const uploadSongsStart=()=>{
    return{
        type:UPLOAD_SONGS_START,
        
        
    }
}
export const uploadSongsSuccess=(message)=>{
    return{
        type:UPLOAD_SONGS_SUCCESS,
        message,
    
    }
}
export const uploadSongsFailed=(error)=>{
    return{
        type:UPLOAD_SONGS_FAILED,
        error
    }
}


export const commentLikeSuccess=()=>{
    return {
        type:COMMENT_LIKE,
    }
}


export const commentDislikeSuccess=()=>{
    return {
        type:COMMENT_DISLIKE,
    }
}




export const replyLikeSuccess=()=>{
    return {
        type:REPLY_LIKE_SUCCESS,
    }
}


export const replyDislikeSuccess=()=>{
    return {
        type:REPLY_DISLIKE_SUCCESS,
    }
}

export const getProgress=(progress)=>{
    return{
        type:GET_PROGRESS,
        progress
    }
}


export const getCategories=()=>{
    return dispatch=>{
        axios.get('http://127.0.0.1:8000/songs/categories/')
        .then(res=>{
            dispatch(getCategoriesSuccess(res.data))

        })
        .catch(err=>{
            dispatch(getCategoriesFailed(err))
        })
    }
}

export const getSongs=()=>{
    return dispatch=>{
        dispatch(getSongsStart())
        axios.get('http://127.0.0.1:8000/songs/')
        .then(res=>{
            dispatch(getSongsSuccess(res.data))
        }).catch(err=>{
                dispatch(getSongsFailed(err))
        })
    }
}



export const getSong=(id)=>{
    return dispatch=>{
        dispatch(getSingleSongStart())

        axios.get(`http://127.0.0.1:8000/songs/song/${id}/`)
        .then(res=>{
            dispatch(getSingleSongSuccess(res.data))
        }).catch(err=>{
                dispatch(getSingleSongFailed(err))
        })
    }
}




export const myUploads=(token)=>{
    return dispatch=>{
        dispatch(getMyUploadsStart())
        axios.get('http://127.0.0.1:8000/songs/myuploads/', { headers: { 'token': token } })
        .then(res=>{
            dispatch(getMyUploadsSuccess(res.data))
        }).catch(err=>{
            dispatch(getMyUploadsFailed(err))
        })
    }
}



export const uploadSongs=(data)=>{
    return dispatch=>{
        const token=data.get('token')
        dispatch(uploadSongsStart()) 
      
        
        axios.post('http://127.0.0.1:8000/songs/upload/',data,{
        onUploadProgress:ProgressEvent=>{
            dispatch(getProgress(Math.round(ProgressEvent.loaded/ProgressEvent.total * 100)))
            console.log(Math.round(ProgressEvent.loaded/ProgressEvent.total * 100)+'%');
        }}
        )
        .then(res=>{
            const message='uploaded successfully!!'
            dispatch(uploadSongsSuccess(message))
            dispatch(myUploads(token))
        }).catch(err=>{

            dispatch(uploadSongsFailed(err.response.data))

        })
    }
}


export const deleteMyUpload=(id,token)=>{
    return dispatch=>{
    axios.delete(`http://127.0.0.1:8000/songs/upload/${id}/`)
    .then(res=>{
        const message='your song was deleted successfully!!'
        dispatch(deleteUploadSuccess(message))

        dispatch(myUploads(token))

    })
    .catch(err=>{
        dispatch(deleteUploadFailed(err))
    })

}
}


export const searchUploadings=(name,token)=>{
    return dispatch=>{
        dispatch(searchUploadsStart())
        axios.get(`http://127.0.0.1:8000/songs/myuploads/?search=${name}/`, { headers: { 'token': token } })
        .then(res=>{
            dispatch(searchUploadsSuccess(res.data))
        }).catch(err=>{
            dispatch(searchUploadsFailed(err))
        })
    }
}



export const uploadToggleLike=(token,id)=>{
    return dispatch=>{
        axios.post('http://127.0.0.1:8000/songs/togglelikes/',{'token':token,'songID':id})
        .then(res=>{
            dispatch(likeToggle(res.data))
        })
    }
}




export const ToggleFollow=(token,id)=>{
    return dispatch=>{
        axios.post('http://127.0.0.1:8000/user/follow/',{'token':token,'id':id})
        .then(res=>{
            dispatch(followToggle(res.data))
        })
    }
}


export const getSuggestions=(token)=>{
    return dispatch=>{
        dispatch(getSongSuggestionsStart())
        axios.get('http://127.0.0.1:8000/songs/suggestions/',{headers:{'token':token}})
        .then(res=>{
            dispatch(getSongSuggestionsSuccess(res.data))
        }).catch(error=>{
            dispatch(getSongSuggestionsFailed(error))
        })
    }
}




export const addComment=(token,id,comment)=>{
    return dispatch=>{
        dispatch(addcommentStart())
        axios.post('http://127.0.0.1:8000/songs/comment/',{token:token,id:id,comment:comment})
        .then(res=>{
            dispatch(addcommentSuccess(res.data))
            dispatch(getSong(id))
        }).catch(error=>{
            dispatch(addcommentFailed(error))
        })
    }
}



export const deleteComment=(id)=>{
    return dispatch=>{
        axios.delete(`http://127.0.0.1:8000/songs/commentdelete/${id}/`)
        .then(res=>{
            const message='deleted'
            dispatch(deletecommentSuccess(res.data,message))
        }).catch(error=>{
            dispatch(deletecommentFailed(error))
        })
    }
}
export const commentsLike=(token,id,songID)=>{
    return dispatch=>{
        axios.post('http://127.0.0.1:8000/songs/commentliketoggle/',{token:token,id:id})
        .then(res=>{
            dispatch(commentLikeSuccess())
            dispatch(getSong(songID))
        })
    }
}

export const commentsDislike=(token,id)=>{
    return dispatch=>{
        axios.post('http://127.0.0.1:8000/songs/commentdisliketoggle/',{token:token,id:id})
        .then(res=>{
            dispatch(commentDislikeSuccess())
        })
    }
}



export const replysLike=(token,id)=>{
    return dispatch=>{
        axios.post('http://127.0.0.1:8000/songs/replyliketoggle/',{token:token,id:id})
        .then(res=>{
            dispatch(replyLikeSuccess())
        })
    }
}

export const replysDislike=(token,id)=>{
    return dispatch=>{
        axios.post('http://127.0.0.1:8000/songs/replydisliketoggle/',{token:token,id:id})
        .then(res=>{
            dispatch(replyDislikeSuccess())
        })
    }
}





export const addReply=(token,id,reply)=>{
    return dispatch=>{
        axios.post('http://127.0.0.1:8000/songs/reply/',{token:token,comment_id:id,reply:reply})
        .then(res=>{
            dispatch(addReplySuccess(res.data))
        }).catch(error=>{
            dispatch(addReplyFailed(error))
        })
    }
}



export const deleteReply=(id)=>{
    return dispatch=>{
        dispatch(deleteReplyStart())
        axios.delete(`http://127.0.0.1:8000/songs/replydelete/${id}/`)
        .then(res=>{
            dispatch(deleteReplySuccess(res.data))
        }).catch(error=>{
            dispatch(deleteReplyFailed(error))
        })
    }
}


export const getPlaylists=(token)=>{
    return dispatch=>{
        dispatch(getPlaylistsStart())
        axios.get('http://127.0.0.1:8000/songs/getplaylists/',{headers:{'token':token}})
        .then(res=>{
            dispatch(getPlaylistsSuccess(res.data))
        }).catch(error=>{
            dispatch(getPlaylistsFailed(error))
        })
    }
}




export const getPlaylistsToAdd=(token)=>{
    return dispatch=>{
        dispatch(getPlaylistsToAddStart())
        axios.get('http://127.0.0.1:8000/songs/getplayliststoadd/',{headers:{'token':token}})
        .then(res=>{
            dispatch(getPlaylistsToAddSuccess(res.data))
        }).catch(error=>{
            dispatch(getPlaylistsToAddFailed(error))
        })
    }
}




export const getPlaylist=(id)=>{
    return dispatch=>{
        dispatch(getPlaylistStart())
        axios.get(`http://127.0.0.1:8000/songs/getplaylist/${id}/`)
        .then(res=>{
            dispatch(getPlaylistSuccess(res.data))
        })
    }
}


export const addPlaylist=(name,token)=>{
    return dispatch=>{
        dispatch(addPlaylistsStart())
        axios.post('http://127.0.0.1:8000/songs/addplaylist/',{name:name,token:token})
        .then(res=>{
            dispatch(addPlaylistsSuccess(res.response))
        }).catch(err=>{
            dispatch(addPlaylistsFailed(err.response))
        })
    }
}




export const addToPlaylist=(song_id,playlist_id)=>{
    return dispatch=>{
        dispatch(addToPlaylistStart())
        axios.post('http://127.0.0.1:8000/songs/addtoplaylist/',{song_id:song_id,playlist_id:playlist_id})
        .then(res=>{
            const message='added successfully'
            dispatch(addToPlaylistSuccess(message))
        }).catch(err=>{
            const error='this song is already in the playlist'
            dispatch(addToPlaylistFailed(error))
        })
    }
}


export const getWhotofollow=(token)=>{
    return dispatch=>{
        dispatch(getWhotofollowStart())
        axios.get('http://127.0.0.1:8000/user/getwhotofollow/',{headers:{'token':token}})
        .then(res=>{
            dispatch(getWhotofollowSuccess(res.data))
        }).catch(error=>{
            dispatch(getWhotofollowFailed(error))
        })
    }
}



export const getCategorySongs=()=>{
    return dispatch=>{
        dispatch(getCategorySongsStart())
        axios.get('http://127.0.0.1:8000/songs/getcategorysongs/')
        .then(res=>{
            dispatch(getCategorySongsSuccess(res.data))
        })
    }
}



export const getCategory=(id)=>{
    return dispatch=>{
        dispatch(getCategoryStart())
        axios.get(`http://127.0.0.1:8000/songs/category/${id}/`)
        .then(res=>{
            dispatch(getCategorySuccess(res.data))
        })
    }
}



export const removeFromPlaylist=(song_id,playlist_id)=>{
    return dispatch=>{
        dispatch(removeFromPlaylistStart())
        axios.post('http://127.0.0.1:8000/songs/removefromplaylist/',{song_id:song_id,playlist_id:playlist_id})
        .then(res=>{
            const message='song removed successfully'
            dispatch(removeFromPlaylistSuccess(message))
        }).catch(err=>{
            const error='this song is already in the playlist'
            dispatch(removeFromPlaylistFailed(error))
        })
    }
}



export const removePlaylist=(playlist_id)=>{
    return dispatch=>{
        dispatch(removePlaylistStart())
        axios.delete(`http://127.0.0.1:8000/songs/removeplaylist/${playlist_id}/`)
        .then(res=>{
            const message='playlist was deleted successfully'
            dispatch(removePlaylistSuccess(message))
        }).catch(err=>{
            const error='this song is already in the playlist'
            dispatch(removePlaylistFailed(error))
        })
    }
}



export const getLastReleases=(token)=>{
    return dispatch=>{
        dispatch(getLastReleasesStart())
        axios.get('http://127.0.0.1:8000/songs/lastreleases/',{headers:{'token':token}})
        .then(res=>{
            dispatch(getLastReleasesSuccess(res.data))
        }).catch(err=>{
            dispatch(getLastReleasesFailed(err))
        })
    }
}



export const searchAll=(query)=>{
    return dispatch=>{
        dispatch(searchAllStart())
        axios.get('http://127.0.0.1:8000/songs/searchsongsusers/',{headers:{'query':query}})
        .then(res=>{
            dispatch(searchAllSuccess(res.data))
        }).catch(err=>{
            dispatch(searchAllFailed(err))
        })
    }
}