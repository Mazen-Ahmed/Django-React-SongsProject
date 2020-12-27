import * as playerActions from '../actions/playerActions1'
const updateObject=(state,newState)=>{
  return{
    ...state,
    ...newState
  }
}
const initialState={
    songs:[],
    duration:0,
    currentSong:null,
    paused:true,
    currentTrack:{},
    currentTrackID: 1,
    history:{},
    currentTime:0
}

export const getCurrentSong=(state,action)=>{
  return updateObject(state,{
    songs:action.songs,
    paused:true
  })
}

export const setPlaylist=(state,action)=>{
  return updateObject(state,{
    songs:action.playlist,
    paused:true

  })
}


export const getDuration=(state,action)=>{
  return updateObject(state,{
    duration:action.duration,
  })
}


export const togglePlay=(state,action)=>{
  return updateObject(state,{
    paused:action.result,
  })
}

export const getCurrerntTime=(state,action)=>{
  return updateObject(state,{
    currentTime:action.currentTime
  })
}



export const setCurrerntTime=(state,action)=>{
  return updateObject(state,{
    currentTime:action.currentTime
  })
}


export const setCurrentTrack=(state,action)=>{
  return updateObject(state,{
        currentTrack:action.song,
        paused:false,

  })
}


export const getLastListened=(state,action)=>{
  return updateObject(state,{
    history:action.history

  })
}

const PlayerReducer= (state=initialState, action) => {
    switch (action.type) {
      case playerActions.GET_CURRENT_SONG:return getCurrentSong(state,action)
      case playerActions.TOGGLE_PLAYING:return togglePlay(state,action)
      case playerActions.SET_CURRENTTIME:return setCurrerntTime(state,action)
      case playerActions.SET_TRACK:return setCurrentTrack(state,action)
      case playerActions.SET_PLAYLIST: return setPlaylist(state,action)
      case playerActions.GET_LISTENING_HISTORY_SUCCESS: return getLastListened(state,action)
      case playerActions.SET_PLAYLIST: return setPlaylist(state,action)
      case playerActions.GET_DURATION: return getDuration(state,action)
      case playerActions.GET_CURRENTTIME: return getCurrerntTime(state,action)

      default:
        return state
    }
}  

export default PlayerReducer