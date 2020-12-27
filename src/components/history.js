import React from 'react'
import {List,Tooltip, Button,Alert,Modal,Col ,Avatar} from 'antd';
import {HeartFilled ,PlayCircleOutlined,HeartOutlined,PlusCircleOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as songActions from '../store/actions/songActions'
import * as playerActions from '../store/actions/playerActions1'
class History extends React.Component {
  state={
    visible: false,
    error:null,
  }

  componentDidMount(){
    this.props.getListeningHistory(localStorage.getItem('token'))
}


showModal = (id) => {
  this.setState({
    visible: true,
    songid:id
  });
};
handleAddToPlaylist = (id) => {
  this.props.addToPlaylist(this.state.songid,id)
};  

handleCancel = () => {
  this.setState({ visible: false });
};



  render(){
   const  setPlay=(id)=>{
        this.props.getCurrentSong(id)
        this.props.setPlaylist(this.props.songs[0].songs)
      }
     const  handleLike=(id)=>{
        this.props.ToggleLike(localStorage.getItem('token'),id)
        this.componentDidMount()
      }
      
  let songId=this.props.currentSong && this.props.currentSong.id || localStorage.getItem('id')&&localStorage.getItem('id')
  return (



            <Col xs={24} sm={24} md={24} lg={24} xl={24}>

<Modal
          visible={this.state.visible}
          title="Your Playlists"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>
          ]}
        >
           {
            this.props.addError
            ?
            <center>
            <Alert
            message= {this.props.addError}
            description='try out another song please'
            type="error"
          
            style={{width:400,textAlign:'center',marginBottom:10}}
          />
          </center>
            :
            ''
          }
          <List
            style={{height:300,overflow:'auto'}}
            dataSource={this.props.playlistsToAdd}
            loading={this.props.loading}
            renderItem={item => (
              <Link onClick={()=>this.handleAddToPlaylist(item.id)}> <List.Item key={item.id}  
              >
              <List.Item.Meta
                  
                  title={<>{item.name} </>}
                  description={item.user}
                />
                
              </List.Item></Link>
            )}
          />
        </Modal>




                <List
            style={{width:'auto',paddingLeft:10,height:360,overflow:'auto'}}
            dataSource={this.props.songs[0]&&this.props.songs[0].songs}
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
              <a key="list-loadmore-edit"onClick={()=>setPlay(item.id)}  >
              <PlayCircleOutlined style={{fontSize:20,color:'#8e44ad'}} /></a></Tooltip>
              ,
             
              item.likes.find(user=>user.username===localStorage.getItem('username'))
              ?
              <Tooltip placement="bottom" title='unlike'>
              <a key="list-loadmore-more" onClick={()=>handleLike(item.id)}>
              <HeartFilled style={{fontSize:20,color:'#8e44ad'}}  /></a></Tooltip>
              :

            <Tooltip placement="bottom" title={`${item.likes_count} Like`}>
            <a key="list-loadmore-more" onClick={()=>handleLike(item.id) }>
            <HeartOutlined style={{fontSize:20,color:'#8e44ad'}}  /></a></Tooltip>,

             <Tooltip placement="bottom" title='Add To Playlist'>
             <a key="list-loadmore-more" onClick={()=>this.showModal(item.id)}>
             <PlusCircleOutlined style={{fontSize:20,color:'#8e44ad'}}  /></a></Tooltip>
            
            ]}>
              <List.Item.Meta
                  
                  avatar={<Avatar src={`https://django-react-music.herokuapp.com${item.cover}`}/>}
                  title={<Link to={`/song/${item.id}`}>{item.name} {item.category.name ?<span style={{backgroundColor:`${item.category.label}`,padding:5,color:'#fff',borderRadius:3}}>{item.category.name}</span>: ''}</Link>}
                  description={item.upload_date}
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
          songs:state.player.history,
          successMessage:state.song.success,
          error:state.song.error,
          categories:state.song.categories,
          currentSong:state.player.currentTrack,
          addError:state.song.addError,
          playlistsToAdd:state.song.playlistsToAdd,
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
          getListeningHistory:(token)=>dispatch(playerActions.getListeningHistory(token)),
          addToPlaylist:(song_id,playlist_id)=>dispatch(songActions.addToPlaylist(song_id,playlist_id)),
        getPlaylists:(token)=>dispatch(songActions.getPlaylists(token)),
        
        }
      }
      
      export default connect(mapStateToProps,mapDispatchToProps)(History)


