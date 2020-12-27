import React,{useRef} from 'react'
import Controls from './controls'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import * as songActions from '../store/actions/songActions'
import * as playerActions from '../store/actions/playerActions1'

 class Player extends React.Component {

    render(){
    
    return (
        <div className='player' style={{position:'fixed',bottom:0,color:'#fff',height:50,width:'100%'}}>

          <Controls />
         
        
        
        </div>
    )
}
 }
 const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null,
    loading:state.song.loading,
    getLoad:state.song.getLoad,
    prog:state.song.progress,
    songs:state.player.songs,
    categories:state.song.categories,
    currentTrackID:state.player.currentTrackID,
    currentTime:state.player.currentTime,
    currentSong:state.player.currentSong
  }
}  

const mapDispatchToProps=dispatch=>{
  return{
    upload:(data)=>dispatch(songActions.uploadSongs(data)),
    searchUploadings:(name,token)=>dispatch(songActions.searchUploadings(name,token)),
    listCategories:()=>dispatch(songActions.getCategories()),

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Player);