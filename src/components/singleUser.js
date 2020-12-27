import React, { Component } from 'react'
import Nav_Bar from '../layouts/nav'
import { Col ,Row,Tabs,Empty,List,Tooltip,Avatar,message} from 'antd'
import {CheckCircleFilled,PlayCircleOutlined,HeartFilled,HeartOutlined,DeleteOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import music from '../music.jpg'
import * as userActions from '../store/actions/userActions'
import * as playerActions from '../store/actions/playerActions1'
import * as songActions from '../store/actions/songActions'
import {connect} from 'react-redux'


let color=null
let icon=null
class SingleUser extends Component {
    componentDidMount(){
        this.props.getUser(this.props.match.params.userID)
        this.props.getPlaylists(this.props.match.params.userID)
        this.props.getUploads(this.props.match.params.userID)
    }

    handleCategory=value=>{
      this.setState({category:value},()=>console.log(this.state.category))
    
    }
    handleLike=(id)=>{
      this.props.ToggleLike(localStorage.getItem('token'),id)
    
    }
    
    setPlay=(id)=>{
      this.props.getCurrentSong(id)
      this.props.setPlaylist(this.props.uploads)
    }
    
    iconHandle=(user)=>{
        if(user==='Normal'){
          color='#dfe6e9'
          icon=null
    
        }else if(user==='Premium'){
          color='#8e44ad'
          icon=<CheckCircleFilled style={{color:'#8e44ad',marginLeft:2}}/>
        }else{
          color='#c0392b'
          icon=<CheckCircleFilled style={{color:'#c0392b',marginLeft:2}}/>
      
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
      

render() {
  let likeMessage=null
 
      if(this.props.message){
        likeMessage=message.info({content:this.props.message,duration:1,style:{marginTop:50}})
        this.props.afterLike()
        this.props.getUploads(this.props.match.params.userID)
      }
let songId=this.props.currentSong && this.props.currentSong.id || localStorage.getItem('id')&&localStorage.getItem('id')

const dark='dark'
    
const { TabPane } = Tabs
return (
           
<div style={{width:'100%',minHeight:710,backgroundColor:'#ecf0f1',paddingTop:1,paddingBottom:50}}>
                  <Nav_Bar  bg={dark}/>
{likeMessage}
<div className='container-fluid' style={{borderRadius:5,padding:50,paddingBottom:5,width:'100%',minHeight:300}}>
            <Row >
                <Col xs={24} sm={24} md={24} lg={8} xl={8} style={{borderRight:'2px #ecf0f1 solid',borderBottom:'2px #ecf0f1 solid',height:400,backgroundColor:'#ffff',paddingLeft:20,paddingRight:20,paddingTop:20}}>
                <center>
                <img src={this.props.user.avatar} style={{borderRadius:'50%',height:200,width:200,border:`5px ${this.handleBorder(this.props.user.user_type)} solid`}}/>
                <h3 >{this.props.user.username}{this.iconHandle(this.props.user.user_type)} </h3>
                
                <span style={{backgroundColor:`${this.handleBorder(this.props.user.user_type)}`,fontSize:15,borderRadius:3,padding:2,color:'#fff'}}>{this.props.user.user_type}</span>
                
                <h4 style={{marginTop:10}} >Followers : {this.props.user.followers_count}</h4>
                <h4 style={{marginTop:10}} >Following : {this.props.user.following_count}</h4>

                </center>
                </Col>

                <Col xs={24} sm={24} md={24} lg={16} xl={16} style={{backgroundColor:'#ffff',color:'red',height:550,paddingLeft:20,paddingRight:20,paddingTop:30}}>
                <Tabs defaultActiveKey="1" >

                <TabPane tab="Uploads" key="1">
                    <div style={{width:'100%',height:450,overflow:'auto'}}>

           
<List
style={{marginTop:40}}
dataSource={this.props.uploads}
loading={this.props.loading}
renderItem={item => (
  <List.Item key={item.id}  
   actions={[
    songId===item.id
    ?
    <p style={{color:'#8e44ad'}}>
    Now Playing
    </p>
    :
  <Tooltip placement="bottom" title='Play'>
  <a key="list-loadmore-edit"onClick={()=>this.setPlay(item.id)}  >
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

]}>
  <List.Item.Meta
      
      avatar={<Avatar src={item.cover}/>}
      title={<Link to={`/song/${item.id}`}>{item.name} {item.category.name ?<span style={{backgroundColor:`${item.category.label}`,padding:5,color:'#fff',borderRadius:3}}>{item.category.name}</span>: ''}</Link>}
      description={item.upload_date}
    />
    
  </List.Item>
)}
/> </div>




                    </TabPane>
                    <TabPane tab="Playlists" key="2" >
                    <div style={{width:'100%',overflow:'auto',height:450}}>
<Row >

    {
    this.props.playlists.length > 0
    ?
      
    this.props.playlists && this.props.playlists.map(plst=>{return(
        <Col xs={24} sm={12} md={12} lg={12} xl={8}>
          <div>
          <Link to={`/playlist/${plst.id}`}>  
          <img src={plst.songs[0] ? `http://127.0.0.1:8000${plst.songs[0].cover}` : music} width='200' height='200'/><br/>
          <span style={{color:'#8e44ad',fontSize:20}}>{plst.name}</span>
          </Link>  
            <br/>
            <span style={{color:'#636e72',fontSize:15}}>{plst.user}</span>
          </div>  
        </Col>  
    )})
    :
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}  style={{marginLeft:'45%'}} />
  
  }
</Row>

 
</div>


                    </TabPane>
                    
                   
                </Tabs>
                                
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
        loading:state.user.loading,
        currentSong:state.player.currentTrack,
        message:state.song.message,

      }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        getUser:(id)=>dispatch(userActions.getUser(id)),
        getPlaylists:(id)=>dispatch(userActions.getUserPlaylists(id)),
        getUploads:(id)=>dispatch(userActions.getUserUploads(id)),
        getCurrentSong:(id)=>dispatch(playerActions.setCurrentSong(id)),
        ToggleLike:(token,id)=>dispatch(songActions.uploadToggleLike(token,id)),
        setPlaylist:(playlist)=>dispatch(playerActions.setPlaylist(playlist)),
        afterLike:()=>dispatch(songActions.afterLike()),
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleUser)