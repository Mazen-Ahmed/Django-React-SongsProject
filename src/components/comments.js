import React, { Component } from 'react'
import {Form,Input,message,Col,Avatar,Skeleton,Row,Tooltip ,Comment, Spin, Empty} from 'antd'
import {UserAddOutlined,RedoOutlined,CommentOutlined,DeleteOutlined ,HeartFilled ,PlusCircleOutlined ,HistoryOutlined,LikeOutlined ,LikeFilled,DislikeOutlined,DislikeFilled,HeartOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import * as playerActions from '../store/actions/playerActions1'
import * as songActions from '../store/actions/songActions'

class Comments extends Component {
state={
    commentID:null,
  }
 
  handleDelete=(id)=>{
    this.props.deleteComment(id)
    this.props.getSong(this.props.songID)
  }    

  
  handleDeleteReply=(id)=>{
    this.props.deleteReply(id)
    this.props.getSong(this.props.songID)
  }    
  handleCommentLike=(id)=>{
    this.props.commentsLike(localStorage.getItem('token'),id,this.props.songID)
}
  handleCommentDislike=(id)=>{
    this.props.commentsDislike(localStorage.getItem('token'),id)
    this.props.getSong(this.props.songID)
  
  }
  
  
     
  handleReplyLike=(id)=>{
    
    this.props.replysLike(localStorage.getItem('token'),id)
    this.props.getSong(this.props.songID)
   
  }
  handleReplyDislike=(id)=>{
   
    this.props.replysDislike(localStorage.getItem('token'),id)
    this.props.getSong(this.props.songID)
   
  }
  
  hnadleReplyCommentID=(id)=>{
    if(id===this.state.commentID){
      this.setState({commentID:null})
    }else{
      this.setState({commentID:id})
  
    }
  }
  
  handleReplySubmit=(id,e)=>{
  this.props.addReply(localStorage.getItem('token'),id,e.target.reply.value)
  this.props.getSong(this.props.songID)

  }
  
    render() {
        return (
            <div className='container'  >
            {this.props.comments&&this.props.comments.length > 0 
            ?
            this.props.comments.map(comment=>{
              return(
                <>
                {this.props.commentLoad
                ?
                <Skeleton avatar paragraph={{ rows: 2 }} active={true} >
                <Comment
                author={<a>{comment.user.username}</a>}
                avatar={
                  <Avatar
                    src={comment.avatar}
                    alt="Han Solo"
                  />
                }
                content={
                  <p>
                    {comment.comment}
                  </p>
                }
                datetime={
                  <Tooltip title={comment.date}>
                    <span>{comment.date}</span>
                  </Tooltip>
  
                }
               />
               </Skeleton>
                :
                <>
                <Comment
                actions={[
                  comment.likes.find(user=>user.username===localStorage.getItem('username'))
                  ?
                  <Tooltip key="comment-basic-like" title="Like">
                  <span onClick={()=>this.handleCommentLike(comment.id)}><LikeFilled style={{fontSize:16,color:'#8e44ad'}}  /> {comment.likes_count >0 ? comment.likes_count: ''}</span>
                </Tooltip>
                  :
                  <Tooltip key="comment-basic-like" title="Like">
                    <span onClick={()=>this.handleCommentLike(comment.id)}><LikeOutlined style={{fontSize:16,color:'#8e44ad'}}  /> {comment.likes_count >0 ? comment.likes_count: ''}</span>
                  </Tooltip>,
                  comment.dislikes.find(user=>user.username===localStorage.getItem('username'))
                  ?
                  <Tooltip key="comment-basic-dislike" title="Dislike">
                          <span className="comment-action" onClick={()=>this.handleCommentDislike(comment.id)}><DislikeFilled style={{fontSize:16,color:'#8e44ad'}} />{comment.dislikes_count >0 ? comment.dislikes_count: ''}</span>
                  </Tooltip>
                  :
                  <Tooltip key="comment-basic-dislike" title="Dislike">
                  <span className="comment-action" onClick={()=>this.handleCommentDislike(comment.id)}><DislikeOutlined style={{fontSize:16,color:'#8e44ad'}} />{comment.dislikes_count >0 ? comment.dislikes_count: ''}</span>
                  </Tooltip>,
                comment.user.username===localStorage.getItem('username')
                ?
              <Tooltip key="comment-basic-dislike" title="Delete Comment">
              <span className="comment-action" onClick={()=>this.handleDelete(comment.id)}  >< DeleteOutlined style={{fontSize:16,color:'#8e44ad'}}/></span>
              </Tooltip>
              
              :
              '',
              <Tooltip key="comment-basic-dislike" title="Reply" >
              <span className="comment-action"  > <RedoOutlined style={{fontSize:16,color:'#8e44ad'}} onClick={()=>this.hnadleReplyCommentID(comment.id)}/></span>
                  </Tooltip>
                ]}
                author={<a>{comment.user.username}</a>}
                avatar={
                  <Avatar
                    src={comment.avatar}
                    alt="Han Solo"
                  />
                }
                content={
                  <p>
                    {comment.comment}
                  </p>
                }
                datetime={
                  <Tooltip title={comment.date}>
                    <span>{comment.date}</span>
                  </Tooltip>
                }
               />
               {comment.id===this.state.commentID
               ?
               <Form style={{marginLeft:42}} onSubmitCapture={(e)=>this.handleReplySubmit(this.state.commentID,e)}>
                 <Form.Item >
                 <Row>
                  <Col xs={2} sm={1} md={1} lg={1} xl={1}>
                  <img src={localStorage.getItem('avatar')} style={{height:33,marginBottom:5,borderRadius:50}}/>
                 </Col>
                 <Col xs={21} sm={{span:17,offset:1}} md={{span:17,offset:1}} lg={{span:19,offset:0}} xl={{span:19,offset:0}} >
                <Input
                    disabled={this.props.loading}
                    placeholder="Add Reply..."
                    name='reply'
                    defaultValue=''
  
                    required
                  />
                  </Col>
                  <Col xs={24} sm={6} md={5} lg={4} xl={4} >

                  <button htmltype='submit' style={{marginLeft:10,background:'none',border:'2px #8e44ad solid',borderRadius:5,color:'#8e44ad',height:32}} id='bttn'>Add Reply</button>
                  </Col>
                  </Row>
       
                 </Form.Item>
  
               </Form>



              :
              ''
                }
               </>
              }
              <div style={{marginLeft:45,borderLeft:'2px #8e44ad solid',paddingLeft:10}}>
              {
              this.props.commentLoad
              ?
                <Skeleton  avatar paragraph={{ rows: 2 }} active={true}>


                  dwq
                </Skeleton>
              :
              comment.replys.map(reply=>{
                return(
                  <Comment
                actions={[
                  reply.likes.find(user=>user.username===localStorage.getItem('username')) || this.state.liked
                  ?
                  <Tooltip key="comment-basic-like" title="Like">
                  <span onClick={()=>this.handleReplyLike(reply.id)}><LikeFilled style={{fontSize:16,color:'#8e44ad'}}  /> {reply.likes_count >0 ? reply.likes_count: ''}</span>
                </Tooltip>
                  :
                  <Tooltip key="comment-basic-like" title="Like">
                    <span onClick={()=>this.handleReplyLike(reply.id)}><LikeOutlined style={{fontSize:16,color:'#8e44ad'}}  /> {reply.likes_count >0 ? reply.likes_count: ''}</span>
                  </Tooltip>,
                  reply.dislikes.find(user=>user.username===localStorage.getItem('username'))
                  ?
                  <Tooltip key="comment-basic-dislike" title="Dislike">
                          <span className="comment-action" onClick={()=>this.handleReplyDislike(reply.id)}><DislikeFilled style={{fontSize:16,color:'#8e44ad'}} />{reply.dislikes_count >0 ? reply.dislikes_count: ''}</span>
                  </Tooltip>
                  :
                  <Tooltip key="comment-basic-dislike" title="Dislike">
                  <span className="comment-action" onClick={()=>this.handleReplyDislike(reply.id)}><DislikeOutlined style={{fontSize:16,color:'#8e44ad'}} />{reply.dislikes_count >0 ? reply.dislikes_count: ''}</span>
                  </Tooltip>,
                reply.user.username===localStorage.getItem('username')
                ?
              <Tooltip key="comment-basic-dislike" title="Delete Comment">
              <span className="comment-action" onClick={()=>this.handleDeleteReply(reply.id)}  >< DeleteOutlined style={{fontSize:16,color:'#8e44ad'}}/></span>
              </Tooltip>
              
              :
              ''
                ]}
                author={<a>{reply.user.username}</a>}
                avatar={
                  <Avatar
                    src={reply.avatar}
                    alt="Han Solo"
                  />
                }
                content={
                  <p>
                    {reply.reply}
                  </p>
                }
                datetime={
                  <Tooltip title={reply.date}>
                    <span>{reply.date}</span>
                  </Tooltip>
                }
               />
  
                )
              })
                }
                </div>
          </>
              )
            })
          :
          <>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          
          </>
          }
          </div>     
        )
    }
}const mapStateToProps=state=>{
    return{
      isAuthenticated:state.auth.token!==null,
      loading:state.song.loading,
      commentLoad:state.song.commentLoad,
      message:state.song.message,
      song:state.song.song,
      successMessage:state.song.success,
      error:state.song.error,
      currentSong:state.player.currentTrack,
      commentLiked:state.song.commentLiked
  
  
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
      commentsLike:(token,id,songID)=>dispatch(songActions.commentsLike(token,id,songID)),
      commentsDislike:(token,id)=>dispatch(songActions.commentsDislike(token,id)),
      replysLike:(token,id,songID)=>dispatch(songActions.replysLike(token,id,songID)),
      replysDislike:(token,id)=>dispatch(songActions.replysDislike(token,id)),
      deleteReply:(id)=>dispatch(songActions.deleteReply(id))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Comments);