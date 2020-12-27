import React from 'react'
import {List,Tooltip, Row,Col ,Avatar} from 'antd';
import {CheckCircleFilled,TeamOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as songActions from '../store/actions/songActions'
import * as playerActions from '../store/actions/playerActions1'
let color=null
let icon=null
class Whotofollow extends React.Component {
  componentDidMount(){
    this.props.getWhotofollow(localStorage.getItem('token'))

}

handleFollowToggle=(id)=>{
    this.props.toggleFollow(localStorage.getItem('token'),id)
    this.props.getWhotofollow(localStorage.getItem('token'))
  }

  iconHandle=(user)=>{
    if(user==='Normal'){
      color='#dfe6e9'
      icon=null

    }else if(user==='Premium'){
      color='#8e44ad'
      icon=<Tooltip><CheckCircleFilled style={{color:'#8e44ad',margin:3,top:0,fontSize:13}}/></Tooltip>
    }else{
      color='#c0392b'
      icon=<Tooltip><CheckCircleFilled style={{color:'#c0392b',margin:3,top:0,fontSize:13}}/></Tooltip>
  
    }
    return icon
  }

  handleBorder=(user)=>{
    if(user==='Normal'){
      color='#dfe6e9'
    }else if(user==='Premium'){
      color='#8e44ad'
    }else{
      color='#c0392b'  
    }
    return color
  
  }
  render(){
  
      
  let songId=this.props.currentSong && this.props.currentSong.file || localStorage.getItem('file')&&localStorage.getItem('file')
  return (
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <List
            style={{marginLeft:10,marginRight:10,paddingBottom:10,width:'auto'}}
            dataSource={this.props.followlist}  
            loading={this.props.followloading}
            renderItem={item => (
              <List.Item key={item.id}  
               actions={[
                  item.followers.find(follower=>follower.username===localStorage.getItem('username'))
                  ?
                  <button style={{marginLeft:10,background:'none',border:'2px #8e44ad solid',borderRadius:5,color:'#8e44ad',height:32}} onClick={()=>this.handleFollowToggle(item.id)} id='bttn'>Unfollow</button>              

                  :
                <button style={{marginLeft:10,background:'none',border:'2px #8e44ad solid',borderRadius:5,color:'#8e44ad',height:32}}  onClick={()=>this.handleFollowToggle(item.id)} id='bttn'>Follow</button>              
            ]}>
              <List.Item.Meta
                  
                  avatar={<Avatar src={item.avatar} style={{border:`2px solid ${this.handleBorder(item.user_type)}`}}/>}
                  title={<Link to={`/user/${item.id}`}>{item.username} {this.iconHandle(item.user_type)} </Link>}
                  description={ <Tooltip placement="bottom" title='followers'><p style={{display:'inline',cursor:'pointer',padding:0,width:10}}><TeamOutlined style={{fontSize:15,marginBottom:15}} /> <span style={{fontSize:12}}>{item.followers_count}</span></p></Tooltip>}
                />
                
              </List.Item>
            )}
          />
            </Col>
        )
    }
  }
    const mapStateToProps=state=>{
        return{
          isAuthenticated:state.auth.token!==null,
          loading:state.song.loading,
          message:state.song.message,
          songs:state.song.history,
          successMessage:state.song.success,
          error:state.song.error,
          categories:state.song.categories,
          currentSong:state.player.currentTrack,
          followloading:state.song.followLoading,
          followlist:state.song.followlist,


        }
      }  
      
      const mapDispatchToProps=dispatch=>{
        return{
          getSongs:()=>dispatch(songActions.getSongs()),
          getSuggestions:(token)=>dispatch(songActions.getSuggestions(token)),
          delete:(id,token)=>dispatch(songActions.deleteMyUpload(id,token)),
          getCurrentSong:(id)=>dispatch(playerActions.setCurrentSong(id)),
          ToggleLike:(token,id)=>dispatch(songActions.uploadToggleLike(token,id)),
          setPlaylist:(playlist)=>dispatch(playerActions.setPlaylist(playlist)),
          getListeningHistory:(token)=>dispatch(playerActions.getListeningHistory(token)) ,
          getWhotofollow:(token)=>dispatch(songActions.getWhotofollow(token)),
          toggleFollow:(token,id)=>dispatch(songActions.ToggleFollow(token,id)),

        }
      }
      
      export default connect(mapStateToProps,mapDispatchToProps)(Whotofollow)