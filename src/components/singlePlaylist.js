import React, { Component } from 'react'
import Nav_Bar from '../layouts/nav'
import { Col ,Row,message,Empty,List,Tooltip,Avatar} from 'antd'
import * as userActions from '../store/actions/userActions'
import * as playerActions from '../store/actions/playerActions1'
import * as songActions from '../store/actions/songActions'
import {connect} from 'react-redux'
import {PlayCircleOutlined,DeleteOutlined,HeartFilled ,HeartOutlined  } from '@ant-design/icons';
import {Redirect,Link} from 'react-router-dom'

class SinglePlaylist extends Component {
componentDidMount(){
this.props.getPlaylist(this.props.match.params.playlistID)
}


handleLike=(id)=>{
    this.props.ToggleLike(localStorage.getItem('token'),id)
  
  }
  
  setPlay=(id,plst)=>{
    this.props.getCurrentSong(id)
    this.props.setPlaylist(plst)
  }

 handleRemovePlaylist=()=>{
  this.props.removePlaylist(this.props.match.params.playlistID)
 } 

 handleRemoveFromPlaylist=(id)=>{
  this.props.removeFromPlaylist(id,this.props.match.params.playlistID)
 } 


render() {
const dark='dark'
let songId=this.props.currentSong && this.props.currentSong.id || localStorage.getItem('id')&&localStorage.getItem('id')
let mess=null
  if(this.props.deleteSuccess){
    mess=message.info({content:this.props.deleteSuccess,duration:1,style:{marginTop:50}})
    this.props.history.push('/playlists')
  }

  if(this.props.message){
    this.setState({visible:false})
    mess=message.info({content:this.props.message,duration:1,style:{marginTop:50}})
    this.props.afterLike()
    this.componentDidMount()
  }
return (
<div style={{width:'100%',minHeight:710,backgroundColor:'#ecf0f1',paddingTop:1,paddingBottom:50}}>
<Nav_Bar  bg={dark}/>
<div className='container-fluid' style={{borderRadius:5,padding:50,paddingBottom:5,width:'100%',minHeight:300}}>
{mess}


<Row>  

<Col span={24}>

<div className='container-fluid' style={{backgroundColor:'#fff',marginRight:20,paddingTop:30,height:550,paddingLeft:20,paddingRight:20,paddingBottom:20}}> 

<h2 style={{color:'#8e44ad'}}><i>{this.props.playlist.user}'s {this.props.playlist.name} </i> </h2> 
<hr style={{width:200,float:"left" }}/>

<div style={{width:'100%',height:400,overflow:'auto'}}>


<List
style={{marginTop:40}}
dataSource={this.props.playlist.songs}
loading={this.props.loading}
renderItem={item => (
  <List.Item key={item.id}  
   actions={[
    songId==item.id
    ?
    <p style={{color:'#8e44ad'}}>
    Now Playing
    </p>
    :
  <Tooltip placement="bottom" title='Play'>
  <a key="list-loadmore-edit"onClick={()=>this.setPlay(item.id,this.props.playlist.songs)}  >
  <PlayCircleOutlined style={{fontSize:20,color:'#8e44ad'}} /></a></Tooltip>
  ,
  this.props.playlist.name!=='Likes'
  ?
  <Tooltip placement="bottom" title='Remove From Playlist'>
  <a key="list-loadmore-more" onClick={()=>this.handleRemoveFromPlaylist(item.id)}>
  <DeleteOutlined style={{fontSize:20,color:'#8e44ad'}}  /></a></Tooltip>
  :
  ' '
  ,
  

  item.likes.find(user=>user.username===localStorage.getItem('username'))
  ?
  <Tooltip placement="bottom" title='unlike'>
  <a key="list-loadmore-more" onClick={()=>this.handleLike(item.id)}>
  <HeartFilled style={{fontSize:20,color:'#8e44ad'}}  /></a></Tooltip>
  :

<Tooltip placement="bottom" title={`${item.likes_count} Like`}>
<a key="list-loadmore-more" onClick={()=>this.handleLike(item.id) }>
<HeartOutlined style={{fontSize:20,color:'#8e44ad'}}  /></a></Tooltip>

]}>
  <List.Item.Meta
      
      avatar={<Avatar src={item.cover}/>}
      title={<Link to={`/song/${item.id}`}>{item.name} {item.category.name ?<span style={{backgroundColor:`${item.category.label}`,padding:5,color:'#fff',borderRadius:3}}>{item.category.name}</span>: ''}</Link>}
      description={item.uploader}
    />
    
  </List.Item>
)}
/> </div>
{ this.props.playlist.name !== 'Likes' && this.props.playlist.user === localStorage.getItem('username')
?
<center>
<button style={{color:'#fff',border:'none',bottom:0,backgroundColor:'#d63031',padding:5,borderRadius:3}} onClick={()=>this.handleRemovePlaylist()}>
  <i>Remove Playlist </i> </button> 
  </center>
:
''
}
</div>

</Col>

</Row>  



</div>        
</div>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        user:state.user.user,
        playlists:state.user.playlists,
        uploads:state.user.uploads,
        loading:state.song.loading,
        message:state.song.message,
        deleteSuccess:state.song.deleteSuccess,
        currentSong:state.player.currentTrack,
        playlist:state.song.playlist
      }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        getUser:(id)=>dispatch(userActions.getUser(id)),
        getPlaylist:(id)=>dispatch(songActions.getPlaylist(id)),
        getUploads:(id)=>dispatch(userActions.getUserUploads(id)),
        getCurrentSong:(id)=>dispatch(playerActions.setCurrentSong(id)),
        ToggleLike:(token,id)=>dispatch(songActions.uploadToggleLike(token,id)),
        setPlaylist:(playlist)=>dispatch(playerActions.setPlaylist(playlist)),
        getPlaylists:(token)=>dispatch(songActions.getPlaylists(token)),
        afterLike:()=>dispatch(songActions.afterLike()),
        removeFromPlaylist:(song_id,playlist_id)=>dispatch(songActions.removeFromPlaylist(song_id,playlist_id)),
        removePlaylist:(playlist_id)=>dispatch(songActions.removePlaylist(playlist_id))
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(SinglePlaylist)