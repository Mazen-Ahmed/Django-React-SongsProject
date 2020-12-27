import * as songActions from "../actions/songActions";

const updateObject=(state,newState)=>{
    return{
        ...state,
        ...newState
    }
}


const initialState = {
  songs:[],
  success:null,
  loading:false,
  error:null,
  deleteSuccess:null,
  getLoad:false,
  followLoading:false,
  categorySongs:[],
  progress:0,
  categories:[],
  message:null,
  suggestions:[],
  song:{},
  playlist:{},
  commentLoad:false,
  commentLiked:false,
  playlists:[],
  playlistsToAdd:[],
  followlist:[],
  category:{},
  addError:null,
  lastReleases:[],
  results:{},
  
};


const toggleLike = (state, action) => {
  return updateObject(state, {
    songs: action.songs,
    error: null,
    loading: false,
    commentLoad:false,
    message:action.message,   
  });
};

const afterLike=(state,action)=>{
  return updateObject(state, {
    message:action.message,   
  });
};


const commentToggleLike = (state, action) => {
  return updateObject(state, {
    songs: action.songs,
    error: null,
    loading: false,
    commentLoad:false,
    commentLiked:true,
    message:action.message,   
    deleteSuccess:null,

  });
};

const commentToggleDislike = (state, action) => {
  return updateObject(state, {
    songs: action.songs,
    error: null,
    loading: false,
    commentLoad:false,
    deleteSuccess:null,

    message:action.message,   
  });
};





const getWhotofollowStart = (state, action) => {
  return updateObject(state, {
    error: null,
    followLoading:true,
    success:null,
    commentLoad:false,
    message:null,
    deleteSuccess:null,

  });
};
const getWhotofollowSuccess = (state, action) => {
  return updateObject(state, {
    followlist: action.users,
    error: null,
    followLoading:false,
    success:null,
    message:null,
    commentLoad:false,
    deleteSuccess:null,


  });
};

const getWhotofollowFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    message:null,
    commentLoad:false,
    addError: null,
    deleteSuccess:null,

    success:null,
    loading: false
  });
};






const searchAllStart = (state, action) => {
  return updateObject(state, {
    error: null,
    followLoading:true,
    success:null,
    commentLoad:false,
    message:null,
    deleteSuccess:null,
  });
};
const searchAllSuccess = (state, action) => {
  return updateObject(state, {
    results: action.results,
    error: null,
    followLoading:false,
    success:null,
    message:null,
    commentLoad:false,
    deleteSuccess:null,
  });
};

const searchAllFailed = (state, action) => {
  return updateObject(state, {
    error: action.error,
    message:null,
    commentLoad:false,
    addError: null,
    deleteSuccess:null,
    success:null,
    loading: false
  });
};





const getLastReleasesStart = (state, action) => {
  return updateObject(state, {
    error: null,
    followLoading:true,
    success:null,
    commentLoad:false,
    message:null,
    deleteSuccess:null,

  });
};
const getLastReleasesSuccess = (state, action) => {
  return updateObject(state, {
    lastReleases: action.songs,
    error: null,
    followLoading:false,
    success:null,
    message:null,
    commentLoad:false,
    deleteSuccess:null,


  });
};

const getLastReleasesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    message:null,
    commentLoad:false,
    addError: null,
    deleteSuccess:null,
    success:null,
    loading: false
  });
};





const getCategorySongsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    success:null,
    commentLoad:false,
    message:null,
    addError: null,
    deleteSuccess:null,

  });
};
const getCategorySongsSuccess = (state, action) => {
  return updateObject(state, {
    categorySongs: action.songs,
    error: null,
    loading: false,
    success:null,
    message:null,
    commentLoad:false,
    addError: null,
    deleteSuccess:null,

  });
};



const getCategoryStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    success:null,
    commentLoad:false,
    message:null,
    addError: null,
    deleteSuccess:null,

  });
};
const getCategorySuccess = (state, action) => {
  return updateObject(state, {
    category: action.category,
    error: null,
    loading: false,
    success:null,
    message:null,
    commentLoad:false,
    addError: null,

  });
};




const getPlaylistStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    success:null,
    commentLoad:false,
    message:null,
    addError: null,

  });
};
const getPlaylistSuccess = (state, action) => {
  return updateObject(state, {
    playlist: action.playlist,
    error: null,
    loading: false,
    success:null,
    message:null,
    addError: null,

    commentLoad:false,

  });
};





const addToPlaylistStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    addError: null,
    deleteSuccess:null,

    success:null,
    commentLoad:false,
    message:null,
  });
};
const addToPlaylistSuccess = (state, action) => {
  return updateObject(state, {
    message: action.message,
    error: null,
    addError: null,
    loading: false,
    deleteSuccess:null,

    commentLoad:false,
  });
};
const addToPlaylistFailed = (state, action) => {
  return updateObject(state, {
    addError: action.error,
    success:null,
    loading:false,
    error:null,
    deleteSuccess:null,

    commentLoad:false,
    message:null,
  });
};




const removePlaylistStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    addError: null,
    success:null,
    commentLoad:false,
    message:null,
    deleteSuccess:null,

  });
};
const removePlaylistSuccess = (state, action) => {
  return updateObject(state, {
    deleteSuccess: action.message,
    error: null,
    addError: null,
    loading: false,
    commentLoad:false,
  });
};
const removePlaylistFailed = (state, action) => {
  return updateObject(state, {
    addError: action.error,
    success:null,
    loading:false,
    deleteSuccess:null,

    error:null,
    commentLoad:false,
    message:null,
  });
};


const removeFromPlaylistStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    addError: null,
    success:null,
    commentLoad:false,
    message:null,
  });
};
const removeFromPlaylistSuccess = (state, action) => {
  return updateObject(state, {
    message: action.message,
    error: null,
    addError: null,
    loading: false,
    commentLoad:false,
  });
};
const removeFromPlaylistFailed = (state, action) => {
  return updateObject(state, {
    error: action.error,
    success:null,
    loading:false,
    error:null,
    commentLoad:false,
    message:null,
  });
};




const addPlaylistStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    success:null,
    commentLoad:false,
    message:null,
  });
};
const addPlaylistSuccess = (state, action) => {
  return updateObject(state, {
    message: 'Added Successfully',
    error: null,
    loading: false,
    commentLoad:false,
  });
};
const addPlaylistFailed = (state, action) => {
  return updateObject(state, {
    error: action.error,
    success:null,
    loading:false,
    commentLoad:false,
    message:null,
  });
};


const getSongsSuggestionStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    success:null,
    commentLoad:false,

    message:null,

  });
};
const getSongsSuggestionSuccess = (state, action) => {
  return updateObject(state, {
    suggestions: action.songs,
    error: null,
    loading: false,
    success:null,
    message:null,
    commentLoad:false,

  });
};

const getSongsSuggestionFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    message:null,
    commentLoad:false,

    success:null,
    loading: false
  });
};




const getSingleSongStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    message:null,
    success:null,
    commentLoad:true,

  });
};
const getSingleSongSuccess = (state, action) => {
  return updateObject(state, {
    song: action.song,
    error: null,
    loading: false,
    success:null,
    success:null,
    commentLoad:false,

  });
};

const getSingleSongFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    success:null,
    commentLoad:false,

    loading: false
  });
};




const getSongsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    message:null,
    commentLoad:false,
    success:null,

  });
};
const getSongsSuccess = (state, action) => {
  return updateObject(state, {
    songs: action.songs,
    error: null,
    loading: false,
    success:null,
    commentLoad:false,

    success:null
   
  });
};

const getSongsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    success:null,
    commentLoad:false,

    loading: false
  });
};







const getPlaylistsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    success:null,
    commentLoad:false,
    message:null,

  });
};
const getPlaylistsSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    success:null,
    message:null,
    commentLoad:false,
    playlists:action.playlists

  });
};

const getPlaylistsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    message:null,
    commentLoad:false,

    success:null,
    loading: false
  });
};





const getPlaylistsToAddStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    success:null,
    commentLoad:false,
    message:null,

  });
};
const getPlaylistsToAddSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    success:null,
    message:null,
    commentLoad:false,
    playlistsToAdd:action.playlists

  });
};

const getPlaylistsToAddFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    message:null,
    commentLoad:false,
    success:null,
    loading: false
  });
};







const getCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    categories: action.categories,
    error: null,
    loading: false,
    success:null,
    commentLoad:false,

  });
};

const getCategoriesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    success:null,
    loading: false
  });
};






const addCommentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: null,
    success:null,
    commentLoad:false,


  });
};

const addCommentSuccess = (state, action) => {
  return updateObject(state, {
    success: action.message,
    error: null,
    loading: false,
    getLoad:false,
    
    commentLoad:false,

   
  });
};




const deleteCommentSuccess = (state, action) => {
  return updateObject(state, {
    success: action.message,
    error: null,
    loading: false,
    getLoad:false,
    
    commentLoad:false,

   
  });
};

const addCommentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    success:null,
    commentLoad:false,

    getLoad:false,
    

  });
};




const addReplyStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: null,
    success:null,
    commentLoad:true,


  });
};

const addReplySuccess = (state, action) => {
  return updateObject(state, {
    success: action.message,
    error: null,
    loading: false,
    getLoad:false,
    
    commentLoad:false,

   
  });
};

const addReplyFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    success:null,
    commentLoad:false,
    getLoad:false,
    

  });
};







const uploadSongsStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true,
      success:null,
      commentLoad:false,


    });
  };
  
  const uploadSongsSuccess = (state, action) => {
    return updateObject(state, {
      success: action.message,
      error: null,
      loading: false,
      getLoad:false,
      progress:0
      

     
    });
  };
  
  const uploadSongsFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false,
      success:null,

      getLoad:false,
      

    });
  };

  

const getUploadingsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    success:null,
    message:null,
    loading: false,
    getLoad:true

  });
};

const getUploadingsSuccess = (state, action) => {
  return updateObject(state, {
    songs: action.songs,
    error: null,
    loading: false,
    success:null,
    message:null,

    getLoad:false

  });
};

const getUploadingsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    success:null,
    message:null,

    getLoad:false


  });
};








const searchUploadingsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    getLoad:true,
    message:null,

  });
};

const searchUploadingsSuccess = (state, action) => {
  return updateObject(state, {
    songs: action.songs,
    error: null,
    loading: false,
    getLoad:false,
    message:null,

  });
};

const searchUploadingsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    getLoad:false,
    message:null,

  });
};





const deleteUploadingsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    getLoad:true

  });
};

const deleteUploadingsSuccess = (state, action) => {
  return updateObject(state, {
    success: action.message,
    error: null,
    loading: false,
    getLoad:false,

  });
};

const deleteUploadingsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    getLoad:false

  });
};



const getProgress=(state,action)=>{
  return updateObject(state,{
    progress:action.progress,
    error: null,
    getLoad:false
  })
}

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case songActions.GET_SONGS_START:return getSongsStart(state, action);
    case songActions.GET_SONGS_SUCCESS:return getSongsSuccess(state, action);
    case songActions.GET_SONGS_FAILED:return getSongsFail(state, action);
    case songActions.GET_SINGLE_SONG_START:return getSingleSongStart(state, action);
    case songActions.GET_SINGLE_SONG_SUCCESS:return getSingleSongSuccess(state, action);
    case songActions.GET_SINGLE_SONG_FAILED:return getSingleSongFail(state, action);
    case songActions.GET_CATEGORY_SONGS_START:return getCategorySongsStart(state, action);
    case songActions.GET_CATEGORY_SONGS_SUCCESS:return getCategorySongsSuccess(state, action);
    case songActions.GET_CATEGORY_START:return getCategoryStart(state, action);
    case songActions.GET_CATEGORY_SUCCESS:return getCategorySuccess(state, action);
    case songActions.GET_SONG_SUGGESTIONS_START:return getSongsSuggestionStart(state, action);
    case songActions.GET_SONG_SUGGESTIONS_SUCCESS:return getSongsSuggestionSuccess(state, action);
    case songActions.GET_SONG_SUGGESTIONS_FAILED:return getSongsSuggestionFail(state, action);
    case songActions.GET_WHOTOFOLLOW_START:return getWhotofollowStart(state, action);
    case songActions.GET_WHOTOFOLLOW_SUCCESS:return getWhotofollowSuccess(state, action);
    case songActions.GET_WHOTOFOLLOW_FAILED:return getWhotofollowFail(state, action);
    case songActions.GET_PLAYLISTS_START:return getPlaylistsStart(state, action);
    case songActions.GET_PLAYLISTS_SUCCESS:return getPlaylistsSuccess(state, action);
    case songActions.GET_PLAYLISTS_FAILED:return getPlaylistsFail(state, action);
    case songActions.GET_PLAYLISTS_TO_ADD_START:return getPlaylistsToAddStart(state, action);
    case songActions.GET_PLAYLISTS_TO_ADD_SUCCESS:return getPlaylistsToAddSuccess(state, action);
    case songActions.GET_PLAYLISTS_TO_ADD_FAILED:return getPlaylistsToAddFail(state, action);
    case songActions.GET_LAST_RELEASES_START:return getLastReleasesStart(state, action);
    case songActions.GET_LAST_RELEASES_SUCCESS:return getLastReleasesSuccess(state, action);
    case songActions.GET_LAST_RELEASES_FAILED:return getLastReleasesFail(state, action);
    case songActions.GET_PLAYLIST_START:return getPlaylistStart(state, action);
    case songActions.GET_PLAYLIST_SUCCESS:return getPlaylistSuccess(state, action);
    case songActions.ADD_PLAYLIST_START:return addPlaylistStart(state, action);
    case songActions.ADD_PLAYLIST_SUCCESS:return addPlaylistSuccess(state, action);
    case songActions.ADD_PLAYLIST_FAILED:return addPlaylistFailed(state, action);
    case songActions.SEARCH_ALL_START:return searchAllStart(state, action);
    case songActions.SEARCH_ALL_SUCCESS:return searchAllSuccess(state, action);
    case songActions.SEARCH_ALL_FAILED:return searchAllFailed(state, action);
    case songActions.ADD_TO_PLAYLIST_START:return addToPlaylistStart(state, action);
    case songActions.ADD_TO_PLAYLIST_SUCCESS:return addToPlaylistSuccess(state, action);
    case songActions.ADD_TO_PLAYLIST_FAILED:return addToPlaylistFailed(state, action);
    case songActions.REMOVE_FROM_PLAYLIST_START:return removeFromPlaylistStart(state, action);
    case songActions.REMOVE_FROM_PLAYLIST_SUCCESS:return removeFromPlaylistSuccess(state, action);
    case songActions.REMOVE_FROM_PLAYLIST_FAILED:return removeFromPlaylistFailed(state, action);
    case songActions.REMOVE_PLAYLIST_START:return removePlaylistStart(state, action);
    case songActions.REMOVE_PLAYLIST_SUCCESS:return removePlaylistSuccess(state, action);
    case songActions.REMOVE_PLAYLIST_FAILED:return removePlaylistFailed(state, action);
    case songActions.GET_CATEGORIES_SUCCESS:return getCategoriesSuccess(state, action);
    case songActions.GET_CATEGORIES_FAILED:return getCategoriesFail(state, action);
    case songActions.UPLOAD_SONGS_START:return uploadSongsStart(state, action);
    case songActions.UPLOAD_SONGS_SUCCESS:return uploadSongsSuccess(state, action);
    case songActions.UPLOAD_SONGS_FAILED:return uploadSongsFail(state, action);
    case songActions.ADD_COMMENT_START:return addCommentStart(state, action);
    case songActions.ADD_COMMENT_SUCCESS:return addCommentSuccess(state, action);
    case songActions.ADD_COMMENT_FAILED:return addCommentFail(state, action);
    case songActions.ADD_REPLY_START:return addReplyStart(state, action);
    case songActions.ADD_REPLY_SUCCESS:return addReplySuccess(state, action);
    case songActions.ADD_REPLY_FAILED:return addReplyFail(state, action);
    case songActions.GET_MY_UPLOADS_START:return getUploadingsStart(state, action);
    case songActions.GET_MY_UPLOADS_SUCCESS:return getUploadingsSuccess(state, action);
    case songActions.GET_MY_UPLOADS_FAILED:return getUploadingsFail(state, action);
    case songActions.SEARCH_UPLOADS_START:return searchUploadingsStart(state, action);
    case songActions.SEARCH_UPLOADS_SUCCESS:return searchUploadingsSuccess(state, action);
    case songActions.SEARCH_UPLOADS_FAILED:return searchUploadingsFail(state, action);
    case songActions.DELETE_UPLOADS_START:return deleteUploadingsStart(state, action);
    case songActions.DELETE_UPLOADS_SUCCESS:return deleteUploadingsSuccess(state, action);
    case songActions.DELETE_UPLOADS_FAILED:return deleteUploadingsFail(state, action);
    case songActions.DELETE_COMMENTS_SUCCESS:return deleteCommentSuccess(state, action);
    case songActions.LIKE_TOGGLE:return toggleLike(state, action);
    case songActions.COMMENT_LIKE:return commentToggleLike(state, action);
    case songActions.COMMENT_DISLIKE:return commentToggleDislike(state, action);
    case songActions.AFTER_LIKE:return afterLike(state, action);
    case songActions.GET_PROGRESS: return getProgress(state,action);
    default:
      return state;
  }
};

export default songReducer;