import React, { Component } from 'react'
import {Form,Input,message,Col,Modal,List,Row,Tooltip ,Button, Spin, Alert} from 'antd'
import {UserAddOutlined,SmileOutlined,PlayCircleOutlined,CommentOutlined ,HeartFilled ,PlusCircleOutlined ,HistoryOutlined,HeartOutlined } from '@ant-design/icons';
import {Redirect,Link} from 'react-router-dom'
import moment from 'moment';
import Comments from './comments'
import {connect} from 'react-redux'
import Nav_Bar from '../layouts/nav'
import * as playerActions from '../store/actions/playerActions1'
import * as songActions from '../store/actions/songActions'
import History from './history'
import Whotofollow from './whotofollow'

let current=null
class SingleSong extends Component {
  state={
    likedid:[],
    commentID:null,
    visible: false,
    songid:null

  }
  componentWillMount(){
        this.props.getSong(this.props.match.params.songID)
        current=this.props.match.params.songID
        if(this.props.isAuthenticated){
        this.props.getPlaylistsToAdd(localStorage.getItem('token'))
        }else{
        }
       
  }
  
handleLike=(id)=>{
  this.props.isAuthenticated
  ?
  this.props.ToggleLike(localStorage.getItem('token'),id)
  :
  this.props.history.push('/signin')
}
handleSubmit=(e)=>{
      this.props.addComment(localStorage.getItem('token'),this.props.song.id,e.target.comment.value)
}
handleDelete=(id)=>{
  this.props.deleteComment(id)
  this.props.getSong(this.props.match.params.songID)
}    
handleCommentLike=(id)=>{
  this.props.commentsLike(localStorage.getItem('token'),id)
  this.props.getSong(this.props.match.params.songID)
}
handleCommentDislike=(id)=>{
  this.props.commentsDislike(localStorage.getItem('token'),id)
  this.props.getSong(this.props.match.params.songID)

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


setPlay=(id)=>{
  const sgs=[]
  this.props.getCurrentSong(id)
  sgs.push({
    'name':this.props.song.name,
    'cover':this.props.song.cover,
    'uploader':this.props.song.uploader,
    'file':this.props.song.file,
    'id':this.props.song.id,
    'likes_count':this.props.song.likes_count,
    'likes':this.props.song.likes
  })
  console.log(sgs);
  this.props.setPlaylist(sgs)
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
render() {
        const dark='dark'
        let songId=this.props.currentSong.id || localStorage.getItem('id')&&localStorage.getItem('id')

        if(this.props.match.params.songID!==current){
          this.componentWillMount()
        } 
        let mess=null
        if(this.props.message){
          mess=message.info({content:this.props.message,duration:1,style:{marginTop:50}})
          this.componentWillMount()
        }
       
        if(this.props.successMessage){
          mess=message.success({content:this.props.successMessage,style:{marginTop:100}})
      }

        return (
          <div style={{width:'100%',minHeight:710,backgroundColor:'#ecf0f1',paddingTop:1,paddingBottom:50}}>
            
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
          <Nav_Bar  bg={dark}/>

<div className='container-fluid' style={{borderRadius:5,padding:50,paddingBottom:5,width:'100%',minHeight:300}}>
          {mess}
        {this.props.loading
          ?
          <Spin tip="Loading..." >
          <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={16}>
      <Row style={{backgroundColor:'#fff',paddingBottom:10,minHeight:200,overflow:'hidden',borderBottom:'2px #ecf0f1 solid' ,borderRight:'2px #ecf0f1 solid'}}>
        <Row style={{width:'100%',height:'100%',background:'linear-gradient( #a29bfe,#dfe6e9)'}}>
        <Col xs={24} sm={24} md={24} lg={24} xl={8}>
      <img  src={this.props.song.cover} style={{height:300,margin:15}}/>
     
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={10} style={{marginLeft:40,marginTop:20,color:'#ffffff',fontSize:25}}>
      <span style={{color:'#ecf0f1'}}>{this.props.song.uploader}</span><br/>
      {this.props.song&&this.props.song.name} <br/>
        {this.props.song.category&&this.props.song.category.name !== ''
          ?
          <i>#{this.props.song.category.name}</i>
          :
          ''
          }
      </Col>
        </Row>
        <Row>
 
              <Col  xs={24} sm={24} md={24} lg={24} xl={24} style={{width:'auto',marginLeft:10,marginTop:10}}>
              {this.props.song.likes&&this.props.song.likes.find(user=>user.username===localStorage.getItem('username'))
              ?
              <Tooltip placement="bottom" title='unlike'>
              <a key="list-loadmore-more" onClick={()=>this.handleLike(this.props.song.id)}>
              <HeartFilled style={{fontSize:20,color:'#8e44ad'}}  /> {this.props.song.likes_count}</a></Tooltip>
              :

            <Tooltip placement="bottom" title={`${this.props.song.likes_count} Like`}>
            <a key="list-loadmore-more" onClick={()=>this.handleLike(this.props.song.id) }>
            <HeartOutlined style={{fontSize:20,color:'#8e44ad'}}  /> {this.props.song.likes_count}</a></Tooltip>
              }
               <Tooltip placement="bottom" title='Comments'> <CommentOutlined style={{fontSize:20,cursor:'pointer',marginLeft:5,color:'#8e44ad'}}/><span style={{fontSize:15,marginTop:20}}> {this.props.song.comments_count}</span></Tooltip>
               <Tooltip placement="bottom" title='Add To Playlist'><a key="list-loadmore-more" onClick={()=>this.showModal(this.props.song.id) }> <span style={{fontSize:20}}><PlusCircleOutlined style={{fontSize:20,marginLeft:5,cursor:'pointer',color:'#8e44ad'}}/> </span></a></Tooltip>
               {songId==this.props.match.params.songID
                ?
                <p style={{color:'#8e44ad',marginLeft:5,display:'inline-block'}}>
                Now Playing
                </p>
                :
              <Tooltip placement="bottom" title='Play'>
              <a key="list-loadmore-edit"onClick={()=>this.setPlay()}  >
              <PlayCircleOutlined style={{fontSize:20,marginLeft:5,color:'#8e44ad'}} /></a></Tooltip>
              
              }
                </Col>
              </Row>
             
{this.props.isAuthenticated
  ?  
 
 <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{marginTop:50,marginRight:15,width:'auto'}}>
   
     <Form onSubmitCapture={this.handleSubmit}>
 <Form.Item>
        <img src={localStorage.getItem('avatar')} style={{width:35,marginLeft:10,height:32,display:'inline-block',marginBottom:5,borderRadius:2}}/>
         <Input
         style={{width:'75%',display:'inline-block'}}
           disabled={this.props.loading}
           placeholder="Add Comment..."
           name='comment'
           defaultValue=''

           required
         />
         <button style={{marginLeft:10,background:'none',display:'inline-block',border:'2px #8e44ad solid',borderRadius:5,color:'#8e44ad',height:32}} id='bttn'>Add comment</button>
        </Form.Item>
        </Form>
        
        <Comments comments={this.props.song.comments} songID={this.props.match.params.songID}/>
   </Col>
   
:
<Comments comments={this.props.song.comments} songID={this.props.match.params.songID}/>

}

        </Row>
      

      <Row>

      </Row>
      </Col>

       <Col xs={24} sm={24} md={24} lg={24} xl={8}>
       {this.props.isAuthenticated
        ?
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Row style={{backgroundColor:'#fff',height:400,borderBottom:'2px #ecf0f1 solid'}}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <h3 style={{color:'#8e44ad',marginTop:5,marginLeft:15,width:'100%'}} ><UserAddOutlined style={{fontSize:25}}/> who to follow</h3>
              <Whotofollow/>
          </Col>
        </Row>
          <Row style={{backgroundColor:'#fff',height:400}}>
                <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                <h3 style={{color:'#8e44ad',marginTop:5,marginLeft:15,width:'100%'}} ><HistoryOutlined  style={{fontSize:25}}/> Listening history</h3>
              
              <History history={this.props.history} loading={this.props.loading} songId={songId}
                />
            </Col>
        </Row>
      </Col>
      :
      <>
        <Row style={{backgroundColor:'#fff',height:600,borderBottom:'2px #ecf0f1 solid',position:'fixed',width:450}}>
              <div>
              <h3 style={{color:'#8e44ad',marginTop:200,marginLeft:50,marginBottom:20,width:'100%'}} ><SmileOutlined  style={{fontSize:25}}/> To Enhance Your Experience Please</h3>

           <Link to='/signin'> <button style={{color:'#fff',backgroundColor:'#8e44ad',border:'none',width:150,height:40,borderRadius:3,marginLeft:50,marginRight:10}} >
            Sign in
            </button></Link>
            or 
            <Link to='/signup'><button style={{color:'#fff',backgroundColor:'#8e44ad',border:'none',width:150,height:40,borderRadius:3,marginLeft:10}} >
            Sign up
            </button></Link>
            </div>
        </Row>
        </>
      
      }
     </Col>
    
     </Row>
      </Spin>
        :
        <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={16}>
      <Row style={{backgroundColor:'#fff',paddingBottom:10,minHeight:200,overflow:'hidden',borderBottom:'2px #ecf0f1 solid' ,borderRight:'2px #ecf0f1 solid'}}>
        <Row style={{width:'100%',height:'100%',background:'linear-gradient( #a29bfe,#dfe6e9)'}}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
      <img  src={this.props.song.cover} style={{height:300,margin:15}}/>
     
      </Col>
      <Col xs={24} sm={24} md={8} lg={8} xl={12} offset={3} style={{marginTop:20,color:'#ffffff',fontSize:25}}>
      <span style={{color:'#ecf0f1'}}>{this.props.song.uploader}</span><br/>
      {this.props.song&&this.props.song.name} <br/>
        {this.props.song.category&&this.props.song.category.name !== ''
          ?
          <i>#{this.props.song.category.name}</i>
          :
          ''
          }
      </Col>
        </Row>
        <Row>
 
              <Col  xs={24} sm={24} md={24} lg={24} xl={24} style={{marginLeft:10,marginTop:10,width:'100%'}}>
              {this.props.song.likes&&this.props.song.likes.find(user=>user.username===localStorage.getItem('username'))
              ?
              <Tooltip placement="bottom" title='unlike'>
              <a key="list-loadmore-more" onClick={()=>this.handleLike(this.props.song.id)}>
              <HeartFilled style={{fontSize:20,color:'#8e44ad'}}  /> {this.props.song.likes_count}</a></Tooltip>
              :

            <Tooltip placement="bottom" title={`${this.props.song.likes_count} Like`}>
            <a key="list-loadmore-more" onClick={()=>this.handleLike(this.props.song.id) }>
            <HeartOutlined style={{fontSize:20,color:'#8e44ad'}}  /> {this.props.song.likes_count}</a></Tooltip>
              }
               <Tooltip placement="bottom" title='Comments'> <CommentOutlined style={{fontSize:20,cursor:'pointer',marginLeft:5,color:'#8e44ad'}}/><span style={{fontSize:15,marginTop:20}}> {this.props.song.comments_count}</span></Tooltip>
               <Tooltip placement="bottom" title='Add To Playlist'><a key="list-loadmore-more" onClick={()=>this.showModal(this.props.song.id) }> <span style={{fontSize:20}}><PlusCircleOutlined style={{fontSize:20,marginLeft:5,cursor:'pointer',color:'#8e44ad'}}/> </span></a></Tooltip>
               {songId==this.props.match.params.songID
                ?
                <p style={{color:'#8e44ad' ,marginLeft:5,display:'inline-block'}}>
                 <a key="list-loadmore-edit"  >Now Playing</a>
                </p>
                :
              <Tooltip placement="bottom" title='Play'>
              <a key="list-loadmore-edit"onClick={()=>this.setPlay(this.props.match.params.songID)}  >
              <PlayCircleOutlined style={{fontSize:20,cursor:'pointer',marginLeft:5,color:'#8e44ad'}} /></a></Tooltip>
              
              }
                </Col>
              </Row>
             
{this.props.isAuthenticated
  ?  
 
 <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{marginTop:50,marginRight:15}} >
   
     <Form onSubmitCapture={this.handleSubmit} >
 <Form.Item >
   <Row>
        <Col xs={2} sm={1} md={1} lg={1} xl={1}>
        <img src={localStorage.getItem('avatar')} style={{height:33,marginBottom:5,borderRadius:50}}/>
        </Col>
          <Col xs={21} sm={{span:17,offset:1}} md={{span:17,offset:1}} lg={{span:19,offset:0}} xl={{span:19,offset:0}} >
         <Input
         
           disabled={this.props.loading}
           placeholder="Add Comment..."
           name='comment'
           defaultValue=''

           required
         />
        </Col>
        <Col xs={24} sm={6} md={5} lg={4} xl={4} >
         <button style={{background:'none',border:'2px #8e44ad solid',marginLeft:5,borderRadius:5,color:'#8e44ad',height:32}} id='bttn'>Add comment</button>
        </Col>
  </Row>
       
        </Form.Item>
        </Form>
        
        <Comments comments={this.props.song.comments} songID={this.props.match.params.songID}/>
   </Col>
   
:
<Comments comments={this.props.song.comments} songID={this.props.match.params.songID}/>

}

        </Row>
      

      <Row>

      </Row>
      </Col>

       <Col xs={24} sm={24} md={24} lg={24} xl={8}>
       {this.props.isAuthenticated
        ?
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Row style={{backgroundColor:'#fff',height:400,borderBottom:'2px #ecf0f1 solid'}}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <h3 style={{color:'#8e44ad',marginTop:5,marginLeft:15,width:'100%'}} ><UserAddOutlined style={{fontSize:25}}/> who to follow</h3>
              <Whotofollow/>
          </Col>
        </Row>
          <Row style={{backgroundColor:'#fff',height:400}}>
                <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                <h3 style={{color:'#8e44ad',marginTop:5,marginLeft:15,width:'100%'}} ><HistoryOutlined  style={{fontSize:25}}/> Listening history</h3>
              
              <History history={this.props.history} loading={this.props.loading} songId={songId}
                />
            </Col>
        </Row>
      </Col>
      :
      <>
        <Row style={{backgroundColor:'#fff',height:600,borderBottom:'2px #ecf0f1 solid',position:'fixed',width:450}}>
              <div>
              <h3 style={{color:'#8e44ad',marginTop:200,marginLeft:50,marginBottom:20,width:'100%'}} ><SmileOutlined  style={{fontSize:25}}/> To Enhance Your Experience Please</h3>

           <Link to='/signin'> <button style={{color:'#fff',backgroundColor:'#8e44ad',border:'none',width:150,height:40,borderRadius:3,marginLeft:50,marginRight:10}} >
            Sign in
            </button></Link>
            or 
            <Link to='/signup'><button style={{color:'#fff',backgroundColor:'#8e44ad',border:'none',width:150,height:40,borderRadius:3,marginLeft:10}} >
            Sign up
            </button></Link>
            </div>
        </Row>
        </>
      
      }
     </Col>
    
     </Row>
    }
             
     



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
      message:state.song.message,
      song:state.song.song,
      successMessage:state.song.success,
      error:state.song.error,
      currentSong:state.player.currentTrack,
      addError:state.song.addError,
      playlistsToAdd:state.song.playlistsToAdd,
    }
  }  
  
  const mapDispatchToProps=dispatch=>{
    return{
    getSong:(id)=>dispatch(songActions.getSong(id)),
      addReply:(token,id,reply)=>dispatch(songActions.addReply(token,id,reply)),
      searchUploadings:(name,token)=>dispatch(songActions.searchUploadings(name,token)),
      deleteComment:(id)=>dispatch(songActions.deleteComment(id)),
      addComment:(token,id,comment)=>dispatch(songActions.addComment(token,id,comment)),
      getCurrentSong:(id)=>dispatch(playerActions.setCurrentSong(id)),
      ToggleLike:(token,id)=>dispatch(songActions.uploadToggleLike(token,id)),
      commentsLike:(token,id)=>dispatch(songActions.commentsLike(token,id)),
      commentsDislike:(token,id)=>dispatch(songActions.commentsDislike(token,id)),
      setPlaylist:(playlist)=>dispatch(playerActions.setPlaylist(playlist)),
      addToPlaylist:(song_id,playlist_id)=>dispatch(songActions.addToPlaylist(song_id,playlist_id)),
      getPlaylistsToAdd:(token)=>dispatch(songActions.getPlaylistsToAdd(token)),
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SingleSong);