import React from 'react'
import Nav_Bar from '../layouts/nav'
import {List,Col,Tooltip, Row,Modal,Button,Alert,message,Avatar} from 'antd';
import {UserAddOutlined,HeartFilled ,PlayCircleOutlined,HistoryOutlined,SmileOutlined,HeartOutlined,PlusCircleOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import * as songActions from '../store/actions/songActions'
import * as playerActions from '../store/actions/playerActions1'
import History from './history'
import {Redirect,Link} from 'react-router-dom'
import Whotofollow from './whotofollow'

class Home extends React.Component {
 state = {
        file:null,
        searchs:null,
        category:null,
        visible: false,
        error:null,
        width:'16%',
        songid:null
      };
  componentDidMount(){
    this.props.getCategorySongs()
    this.props.getPlaylists(localStorage.getItem('token'))
    this.props.getPlaylistsToAdd(localStorage.getItem('token'))

  }


  showModal = (id) => {
    this.setState({
      visible: true,
      songid:id
    });
  };
   handleCancel = () => {
    this.setState({ visible: false });
  };

  handleAddToPlaylist = (id) => {
    this.props.addToPlaylist(this.state.songid,id)
  };  
setPlay=(id,songs)=>{
  const aud = document.getElementById('Aud');
  this.props.getCurrentSong(id)
  this.props.setPlaylist(songs)
}
handleLike=(id)=>{
  this.props.ToggleLike(localStorage.getItem('token'),id)
  this.componentDidMount()
}
render(){

    const dark='dark'
let songId=this.props.currentSong.id || localStorage.getItem('id')&&localStorage.getItem('id')
  let likeMessage=null

  if(this.props.message){
        likeMessage=message.info({content:this.props.message,duration:1,style:{marginTop:50}})
        this.props.afterLike()
      }
    return (
      
<div style={{width:'100%',minHeight:710,backgroundColor:'#ecf0f1',paddingTop:1,paddingBottom:50}}>
                  <Nav_Bar  bg={dark} cls='fixed-top'/>
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
        {likeMessage}
<div className='container-fluid' style={{borderRadius:5,padding:50,paddingBottom:5,width:'100%',minHeight:300}}>
<Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={16}>
      <Row style={{backgroundColor:'#fff',minHeight:600,paddingLeft:20 ,borderRight:'2px #ecf0f1 solid'}}>

        {this.props.categorySongs.map(category=>{
          return(
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>

         
            <h2 style={{color:'#8e44ad',marginTop:10,width:'20%'}} ><i>#{category.name}</i></h2>
            
            <List
            style={{width:'auto',overflow:'auto'}}
            dataSource={category.songs}
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
              <a key="list-loadmore-edit"onClick={()=>this.setPlay(item.id,category.songs)}  >
              <PlayCircleOutlined style={{fontSize:20,color:'#8e44ad'}} /></a></Tooltip>
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
            ,
              <Tooltip placement="bottom" title='Add To Playlist'>
              <a key="list-loadmore-more" >
              <PlusCircleOutlined style={{fontSize:20,color:'#8e44ad'}} onClick={()=>this.showModal(item.id)}  /></a></Tooltip>
            ]}>
              <List.Item.Meta
                  
                  avatar={<Avatar src={`http://127.0.0.1:8000/media/${item.cover}`}/>}
                  title={<Link to={`/song/${item.id}`}>{item.name} {item.category.name ?<span style={{backgroundColor:`${item.category.label}`,padding:5,color:'#fff',borderRadius:3}}>{item.category.name}</span>: ''}</Link>}
                  description={<>{item.uploader} <br/> {item.upload_date} </>}
                />
                
              </List.Item>
            )}
          />
          <Link to={`/category/${category.id}`}><h4 style={{textAlign:"center", color:'#8e44ad'}}>view all</h4></Link>
          <hr style={{marginTop:20,marginBottom:40}}/>
          </Col>      
              );
        })}
      
       </Row>
      </Col>
      
     <Col xs={24} sm={24} md={24} lg={24} xl={8}>
        {this.props.isAuthenticated
        ?
        <>
        <Row style={{backgroundColor:'#fff',height:400,borderBottom:'2px #ecf0f1 solid'}}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <h3 style={{color:'#8e44ad',marginTop:5,marginLeft:15,width:'100%'}} ><UserAddOutlined style={{fontSize:25}}/> who to follow</h3>
              <Whotofollow/>
          </Col>
        </Row>
          <Row style={{backgroundColor:'#fff',height:420}}>
                <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                <h3 style={{color:'#8e44ad',marginTop:5,marginLeft:15,width:'100%'}} ><HistoryOutlined  style={{fontSize:25}}/> Listening history</h3>
              
              <History history={this.props.history} loading={this.props.loading} songId={songId}
                />
            </Col>
        </Row>
      </>
        
      :
      <Col xs={24} sm={24} md={24} lg={24} xl={8}>   
        <Row style={{backgroundColor:'#fff',height:600,borderBottom:'2px #ecf0f1 solid',position:'fixed',width:450}}>
            <h3 style={{color:'#8e44ad',marginTop:200,marginLeft:50,marginBottom:20,width:'100%'}} ><SmileOutlined  style={{fontSize:25}}/> To Enhance Your Experience Please</h3>

           <Link to='/signin'> <button style={{color:'#fff',backgroundColor:'#8e44ad',border:'none',width:150,height:40,borderRadius:3,marginLeft:50,marginRight:10}} >
            Sign in
            </button></Link>
            or 
            <Link to='/signup'><button style={{color:'#fff',backgroundColor:'#8e44ad',border:'none',width:150,height:40,borderRadius:3,marginLeft:10}} >
            Sign up
            </button></Link>
            
        </Row>
        </Col>
      
      }
      
      </Col>
      
      </Row>
            </div>

        </div>
    )
}
}
const mapStateToProps=state=>{
    return{
      isAuthenticated:state.auth.token!==null,
      loading:state.song.loading,
      followloading:state.song.followLoading,
      addError:state.song.addError,
      playlists:state.song.playlists,
      playlistsToAdd:state.song.playlistsToAdd,
      history:state.player.history,
      followlist:state.song.followlist,
      message:state.song.message,
      songs:state.song.suggestions,
      successMessage:state.song.success,
      error:state.song.error,
      categorySongs:state.song.categorySongs,
      currentSong:state.player.currentTrack
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
      getCategorySongs:()=>dispatch(songActions.getCategorySongs()),
      getPlaylists:(token)=>dispatch(songActions.getPlaylists(token)),
      getPlaylistsToAdd:(token)=>dispatch(songActions.getPlaylistsToAdd(token)),

      afterLike:()=>dispatch(songActions.afterLike()),

  addToPlaylist:(song_id,playlist_id)=>dispatch(songActions.addToPlaylist(song_id,playlist_id)),
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Home)