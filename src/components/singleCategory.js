import React from 'react';
import {Form,Input,Button,Alert,Col,Avatar,List,Row,Tooltip ,message, Select, Divider} from 'antd'
import {PlayCircleOutlined,CloudUploadOutlined,LoadingOutlined,DeleteOutlined,UploadOutlined,HeartFilled ,HeartOutlined ,SearchOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'
import Nav_Bar from '../layouts/nav'
import FormData from 'form-data';
import { Icon } from 'semantic-ui-react'
import * as playerActions from '../store/actions/playerActions1'
import * as songActions from '../store/actions/songActions'


 class SingleCategory extends React.Component {
    state = {
        file:null,
        searchs:null,
        category:null,
        error:null,
        width:'16%'
      };
    
componentDidMount(){
    this.props.getCategory(this.props.match.params.catID)
    this.props.listCategories()
  }


handleCategory=value=>{
  this.setState({category:value},()=>console.log(this.state.category))

}
handleLike=(id)=>{
  this.props.ToggleLike(localStorage.getItem('token'),id)

}

setPlay=(id,plst)=>{
  this.props.getCurrentSong(id)
  this.props.setPlaylist(plst)
}

handleInput=(e)=>{
  if(e.target.value ){
  this.setState({width:'30%'})    
  }
  else{
    this.setState({width:'16%'})    

  }
}

 
  render() {
  let likeMessage=null
  let mess=null
      if(this.props.successMessage){
          mess=message.success({content:this.props.successMessage,style:{marginTop:100}})
      }
      if(this.props.message){
        likeMessage=message.info({content:this.props.message,duration:1,style:{marginTop:50}})
        this.componentDidMount()
      }

    let songId=this.props.currentSong && this.props.currentSong.file || localStorage.getItem('file')&&localStorage.getItem('file')

      
    if(!this.props.isAuthenticated  ) return <Redirect to='/signin' />
    return (

        <div style={{width:'100%',minHeight:710,backgroundColor:'#ecf0f1',paddingTop:1,paddingBottom:50}}>
       
                        <Nav_Bar  bg='dark'/>
        
        <div className='container-fluid' style={{borderRadius:5,padding:50,paddingBottom:5,width:'100%',minHeight:300}}>
        {mess}
        {likeMessage}
       
               <Row>  

            <Col span={24}>
         
            <div className='container-fluid' style={{backgroundColor:'#fff',marginRight:20,paddingTop:30,height:600,paddingLeft:20,paddingRight:20,paddingBottom:20}}> 
       
           <h2 style={{color:'#8e44ad'}}><i>#{this.props.category.name} </i> </h2> 
            <hr style={{width:200,float:"left" }}/>
            <div style={{width:'100%',height:450,overflow:'auto'}}>

           
            <List
            style={{marginTop:40}}
            dataSource={this.props.category.songs}
            loading={this.props.getLoad}
            renderItem={item => (
              <List.Item key={item.id}  
               actions={[
                songId===item.file
                ?
                <p style={{color:'#8e44ad'}}>
                Now Playing
                </p>
                :
              <Tooltip placement="bottom" title='Play'>
              <a key="list-loadmore-edit"onClick={()=>this.setPlay(item.id,this.props.category.songs)}  >
              <PlayCircleOutlined style={{fontSize:20,color:'#8e44ad'}} /></a></Tooltip>
              ,
              <Tooltip placement="bottom" title='Delete'>
              <a key="list-loadmore-more" onClick={()=>this.props.delete(item.id,localStorage.getItem('token'))}>
              <DeleteOutlined style={{fontSize:20,color:'#8e44ad'}}  /></a></Tooltip>,
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
                  avatar={<Avatar src={`http://127.0.0.1:8000/media/${item.cover}`}/>}
                  title={<Link to={`/song/${item.id}`}>{item.name} {this.props.category.name ?<span style={{backgroundColor:`${this.props.category.label}`,padding:5,color:'#fff',borderRadius:3}}>{this.props.category.name}</span>: ''}</Link>}
                  description={item.upload_date}
                />
                
              </List.Item>
            )}
          /> </div>
            </div>
            </Col>
            </Row>  
          
      
</div>
</div>
    );
  }
}
const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null,
    loading:state.song.loading,
    getLoad:state.song.getLoad,
    message:state.song.message,
    category:state.song.category,
    successMessage:state.song.success,
    error:state.song.error,
    categories:state.song.categories,
    currentSong:state.player.currentTrack


  }
}  

const mapDispatchToProps=dispatch=>{
  return{
    upload:(data)=>dispatch(songActions.uploadSongs(data)),
    getCategory:(id)=>dispatch(songActions.getCategory(id)),
    searchUploadings:(name,token)=>dispatch(songActions.searchUploadings(name,token)),
    listCategories:()=>dispatch(songActions.getCategories()),
    delete:(id,token)=>dispatch(songActions.deleteMyUpload(id,token)),
    getCurrentSong:(id)=>dispatch(playerActions.setCurrentSong(id)),
    ToggleLike:(token,id)=>dispatch(songActions.uploadToggleLike(token,id)),
    setPlaylist:(playlist)=>dispatch(playerActions.setPlaylist(playlist)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleCategory);