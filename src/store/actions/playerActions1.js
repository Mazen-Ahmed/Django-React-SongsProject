import axios from 'axios'
export const GET_CURRENT_SONG = 'GET_CURRENT_SONG'
export const TOGGLE_RANDOM = 'TOGGLE_RANDOM'
export const TOGGLE_REPLAY = 'toggleReplay'
export const TOGGLE_PLAYING = 'togglePlaying'
export const SET_TRACK = 'setTracks'
export const SET_CURRENT_TIME='setCurrentTime'
export const SET_PLAYLIST='setPlaylist'
export const GET_LISTENING_HISTORY_SUCCESS='getListeningHistorySuccess'
export const SET_LISTENING_HISTORY_SUCCESS='setListeningHistorySuccess'
export const GET_DURATION='getDuration'
export const GET_CURRENTTIME='getCurrentTime'
export const SET_CURRENTTIME='setCurrentTime'


export const GetListeningHistory=(history)=>{
  return{
    type:GET_LISTENING_HISTORY_SUCCESS,
    history
  }
}
export const SetListeningHistory=()=>{
  return{
    type:SET_LISTENING_HISTORY_SUCCESS
  }
}

export const getCurrentSong=(songs)=>{
    return{
        type:GET_CURRENT_SONG,
        songs:songs,
        currentSong:songs[0]
    }
}

export const toggleReplay=()=>{
    return{
        type:TOGGLE_REPLAY
    }
}



export function play(audio) {
    if (audio.paused)
      audio.play();
    else
      audio.pause();
  
    return {
      type: TOGGLE_PLAYING,
      result: audio.paused,

  }
}

export function getDuration(duration){
  return{
    type:GET_DURATION,
    duration:duration,
  }
}



export function getCurrentTime(currentTime){
  return{
    type:GET_CURRENTTIME,
    currentTime:currentTime
  }
}


export function setCurrentTime(value){
 
  return{
    type:SET_CURRENTTIME,
    currentTime:value
  }
}


export const setCurrent=(song)=>{
    return{
      type:SET_TRACK,
      song:song,
    
    }
  }

  export const setPlaylist=(playlist)=>{
    const sgs=[]

    if (playlist){
    for (var x of playlist){
        sgs.push({
          'name':x.name,
          'cover':x.cover,
          'uploader':x.uploader,
          'file':x.file,
          'id':x.id,
          'likes_count':x.likes_count,
          'likes':x.likes
        })
      }
    }
    localStorage.setItem('playlist',JSON.stringify(sgs))
    return{
      type:SET_PLAYLIST,
      playlist
    }
  }
  
 

export const setListeningHistory=(song_id,token)=>{
    return dispatch=>{
      axios.post('http://127.0.0.1:8000/songs/lastlistened/',{song_id:song_id,token:token})
      .then(res=>{
        dispatch(SetListeningHistory(res.data))
      })
    }

}



export const getListeningHistory=(token)=>{
  return dispatch=>{
   axios.get('http://127.0.0.1:8000/songs/getlastlistened/',{headers:{'token':token}})
    .then(res=>{
      dispatch(GetListeningHistory(res.data))
    })
  }

}



export function setCurrentSong(id){
  return dispatch=>{
    axios.get(`http://127.0.0.1:8000/songs/setcurrent/${id}/`)
    .then(res=>{
      dispatch(setCurrent(res.data))
      const file=res.data.file
      const name=res.data.name
      const cover=res.data.cover
      const id=res.data.id
      const uploader=res.data.uploader
      localStorage.setItem('uploader',uploader)
      localStorage.setItem('file',file)
      localStorage.setItem('songName',name)
      localStorage.setItem('songCover',cover)
      localStorage.setItem('id',id)

    })
    if(localStorage.getItem('token')){
    dispatch(setListeningHistory(id,localStorage.getItem('token')))
  }
 
}
}

export function setCurrentSongs(song) {
  if(song){
    const file=song.file
    const name=song.name
    const cover=song.cover
    const id=song.id
    const uploader=song.uploader
    localStorage.setItem('file',file)
    localStorage.setItem('songName',name)
    localStorage.setItem('uploader',uploader)
    localStorage.setItem('songCover',cover)
    localStorage.setItem('id',id)

    return {
      type: SET_TRACK,
       song
    }
  }else{
    return {
      type: SET_TRACK,
      song:{}
  }
}
}


