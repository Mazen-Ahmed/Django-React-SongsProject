import React, { Component } from 'react'
import {Input ,Col,Form,Alert, Row,Spin,Modal,message,Button ,Empty} from 'antd';
import Nav_Bar from '../layouts/nav'
import Comments from './comments'
import {connect} from 'react-redux'
import * as playerActions from '../store/actions/playerActions1'
import * as songActions from '../store/actions/songActions'
import History from './history'
import {Link,Redirect} from 'react-router-dom'
import {UserAddOutlined  ,PlayCircleOutlined ,PlusCircleOutlined ,HistoryOutlined,LikeOutlined ,LikeFilled,DislikeOutlined,DislikeFilled,HeartOutlined } from '@ant-design/icons';
import Whotofollow from './whotofollow'
import music from '../music.jpg'
class Playlists extends Component {
  state = { visible: false,name:null };

  showModal = () => {
    this.setState({
      visible: true,

    });
  };


  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

    componentDidMount(){
      this.props.getPlaylists(localStorage.getItem('token'))
      this.props.getPlaylistsToAdd(localStorage.getItem('token'))

    }

  handleSubmit=(e)=>{
    if(this.state.name === null){

    }else{
    e.preventDefault()
    this.props.addPlaylist(this.state.name,localStorage.getItem('token'))
    }
  }

handleChange=(e)=>{
this.setState({
  name:e.target.value
})
}


render() {
const dark='dark'
let err=null
let mess=null


  if(this.props.message){
    this.setState({visible:false})
    mess=message.info({content:this.props.message,duration:1,style:{marginTop:50}})
    this.props.afterLike()
    this.props.getPlaylists(localStorage.getItem('token'))
  }

  if(!this.props.isAuthenticated) return <Redirect to='/signin' />
  let songId=this.props.currentSong.id || localStorage.getItem('id')&&localStorage.getItem('id')

return (
    <div style={{width:'100%',minHeight:710,backgroundColor:'#ecf0f1',paddingTop:1,paddingBottom:50}}>
    <Nav_Bar  bg={dark}/>
{mess}
<div className='container-fluid' style={{borderRadius:5,padding:50,paddingBottom:5,width:'100%',minHeight:300}}>


  <Row>
  {this.props.loading

  ?

  <Col xs={24} sm={24} md={24} lg={24} xl={16}>
     <Spin >
<Row style={{backgroundColor:'#fff',minHeight:200,overflow:'auto' ,borderRight:'2px #ecf0f1 solid',paddingLeft:20}}>
    <div style={{width:'100%'}}>
<h3 style={{color:'#8e44ad',marginTop:15,width:'100%'}} ><PlayCircleOutlined   style={{fontSize:25}}/> Playlists</h3>
<Row>

    {
    this.props.playlists.length > 0
    ?

    this.props.playlists && this.props.playlists.map(plst=>{return(
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <div>
          <Link>
          <img src={plst.songs[0] ? `https://django-react-music.herokuapp.com${plst.songs[0].cover}` : music} width='200' height='200'/><br/>
          <span style={{color:'#8e44ad',fontSize:20}}>{plst.name}</span>
          </Link>
            <br/>
            <span style={{color:'#636e72',fontSize:15}}>{plst.user}</span>
          </div>
        </Col>
    )})

    :
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

  }
</Row>


</div>

<Row>
<Col  span={24} style={{marginTop:50,marginRight:15}}>

</Col>
</Row>

  </Row>


<Row>

</Row>
</Spin>

</Col>
:
<Col xs={24} sm={24} md={24} lg={24} xl={16}>
<Row style={{backgroundColor:'#fff',minHeight:200,overflow:'auto',borderBottom:'2px #ecf0f1 solid' ,borderRight:'2px #ecf0f1 solid',paddingLeft:20}}>
    <div style={{width:'100%'}}>
<h3 style={{color:'#8e44ad',marginTop:15,width:'100%'}} ><PlayCircleOutlined   style={{fontSize:25}}/> Playlists</h3>
<br/><br/>
<Row>
{
    this.props.playlists.length > 0
    ?

    this.props.playlists && this.props.playlists.map(plst=>{return(
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <div>
          <Link to={`playlist/${plst.id}`}>
          <img src={plst.songs[0] ? `http://127.0.0.1:8000${plst.songs[0].cover}` : music} width='200' height='200'/><br/>
          <span style={{color:'#8e44ad',fontSize:20}}>{plst.name}</span>
          </Link>
            <br/>
            <span style={{color:'#636e72',fontSize:15}}>{plst.user}</span>
          </div>
        </Col>
    )})
    :
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}  style={{marginLeft:'45%'}}/>
  }


</Row>
<center>
<button style={{color:'#fff',border:'none',marginTop:50,backgroundColor:'#8e44ad',bottom:0,marginRight:10,padding:5,borderRadius:3}}onClick={this.showModal}> Add Playlist</button>
</center>
<Modal
          title="Add Playlist"
          visible={this.state.visible}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
             Cancel
            </Button>,
            <Button  onClick={this.handleSubmit} loading={this.props.loading} >
              Add
            </Button>,
          ]}
        >
          {
            this.props.error
            ?
            <center>
            <Alert
            message='This name is not available'
            description='try out another name please'
            type="error"

            style={{width:400,textAlign:'center',marginBottom:10}}
          />
          </center>
            :
            ''
          }


         <Input
                  disabled={this.props.loading}
                  style={{width:470}}
                    disabled={this.props.loading}
                    onChange={this.handleChange}
                    placeholder="Playlist Name..."
                    name='playlistname'
                    defaultValue={this.state.name}
                    required
                  />

        </Modal>

</div>

<Row>
<Col  span={24} style={{marginTop:50,marginRight:15}}>

</Col>
</Row>

  </Row>


<Row>

</Row>
</Col>}
<Col xs={24} sm={24} md={24} lg={24} xl={8}>
        <Row style={{backgroundColor:'#fff',height:400,borderBottom:'2px #ecf0f1 solid'}}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <h3 style={{color:'#8e44ad',marginTop:5,marginLeft:15,width:'40%'}} ><UserAddOutlined style={{fontSize:25}}/> who to follow</h3>
              <Whotofollow/>
          </Col>
        </Row>
          <Row style={{backgroundColor:'#fff',height:400}}>
                <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                <h3 style={{color:'#8e44ad',marginTop:5,marginLeft:15,width:'40%'}} ><HistoryOutlined  style={{fontSize:25}}/> Listening history</h3>

              <History history={this.props.history} loading={this.props.loading} songId={songId}
                />
            </Col>
        </Row>
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
history:state.player.history,
commentLoad:state.song.commentLoad,
playlists:state.song.playlists,
song:state.song.song,
message:state.song.message,
error:state.song.error,
currentSong:state.player.currentTrack,


}
}

const mapDispatchToProps=dispatch=>{
return{
getSong:(id)=>dispatch(songActions.getSong(id)),
addReply:(token,id,reply)=>dispatch(songActions.addReply(token,id,reply)),
searchUploadings:(name,token)=>dispatch(songActions.searchUploadings(name,token)),
deleteComment:(id)=>dispatch(songActions.deleteComment(id)),
getPlaylists:(token)=>dispatch(songActions.getPlaylists(token)),
getCurrentSong:(id)=>dispatch(playerActions.setCurrentSong(id)),
ToggleLike:(token,id)=>dispatch(songActions.uploadToggleLike(token,id)),
commentsLike:(token,id)=>dispatch(songActions.commentsLike(token,id)),
commentsDislike:(token,id)=>dispatch(songActions.commentsDislike(token,id)),
setPlaylist:(playlist)=>dispatch(playerActions.setPlaylist(playlist)),
addPlaylist:(name,token)=>dispatch(songActions.addPlaylist(name,token)),
afterLike:()=>dispatch(songActions.afterLike()),
getPlaylistsToAdd:(token)=>dispatch(songActions.getPlaylistsToAdd(token)),

}
}

export default connect(mapStateToProps,mapDispatchToProps)(Playlists)
