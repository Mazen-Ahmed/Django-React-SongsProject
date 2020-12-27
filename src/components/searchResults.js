import React, { Component } from 'react'
import Nav_Bar from '../layouts/nav'
import { Col ,Row,Tabs,Empty,List,Tooltip,Avatar,message} from 'antd'
import {SearchOutlined,PlayCircleOutlined,HeartFilled,HeartOutlined,PlusCircleOutlined,TeamOutlined,CheckCircleFilled } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import music from '../music.jpg'
import * as userActions from '../store/actions/userActions'
import * as playerActions from '../store/actions/playerActions1'
import * as songActions from '../store/actions/songActions'
import {connect} from 'react-redux'

const { TabPane } = Tabs;
let current=null
let color=null
let icon=null
class SearchResults extends Component {
  state={
    visible: false,
    error:null,
  }

    componentDidMount(){
      this.props.searchResults(this.props.match.params.query)
      current=this.props.match.params.query

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

    render() {

    
    
      if(this.props.match.params.query!==current){
        this.componentDidMount()
      } 
       const  setPlay=(id)=>{
            this.props.getCurrentSong(id)
            this.props.setPlaylist(this.props.songs)
          }
      const  handleLike=(id)=>{
            this.props.ToggleLike(localStorage.getItem('token'),id)
            this.componentDidMount()
          }
          

      
        let likeMessage=null
       
            if(this.props.message){
              likeMessage=message.info({content:this.props.message,duration:1,style:{marginTop:50}})
              this.props.afterLike()
              this.props.getUploads(this.props.match.params.userID)
            }
      let songId=this.props.currentSong && this.props.currentSong.id || localStorage.getItem('id')&&localStorage.getItem('id')
      
      const dark='dark'
          
      const { TabPane } = Tabs
      console.log(this.props.playlists);
      return (
         
            <div style={{width:'100%',minHeight:710,backgroundColor:'#ecf0f1',paddingTop:1,paddingBottom:50}}>
                  <Nav_Bar  bg={dark}/>
            {likeMessage}
            <div className='container-fluid' style={{borderRadius:5,padding:50,paddingBottom:5,width:'100%',minHeight:300}}>
            <Row >
            <Col xs={24} sm={24} md={24} lg={16} xl={24} style={{backgroundColor:'#ffff',color:'red',minHeight:550,paddingLeft:20,paddingRight:20,paddingTop:10}}>
            <h3 style={{color:'#8e44ad',marginTop:25,width:'100%'}} ><SearchOutlined  style={{fontSize:25}} /> Search Results for '{this.props.match.params.query}'</h3>
                <br/><br/>
            <Tabs tabPosition='left' >
          <TabPane tab="Songs" key="1">
          <List
            style={{width:'auto',paddingLeft:10,height:400,overflow:'auto'}}
            dataSource={this.props.results.songs}
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
                  
                  avatar={<Avatar src={`http://127.0.0.1:8000${item.cover}`}/>}
                  title={<Link to={`/song/${item.id}`}>{item.name} {item.category.name ?<span style={{backgroundColor:`${item.category.label}`,padding:5,color:'#fff',borderRadius:3}}>{item.category.name}</span>: ''}</Link>}
                  description={item.upload_date}
                />
                
              </List.Item>
            )}
          />
          </TabPane>



          <TabPane tab=" People" key="2">
          <List
            style={{marginLeft:10,marginRight:10,paddingBottom:10,width:'auto',height:400,overflow:'auto'}}
            dataSource={this.props.results.users}  
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
          </TabPane>



        <TabPane tab=" Categories" key="3"  >
        {this.props.results.categories&&this.props.results.categories.map(category=>{
          return(
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>

         
            <h2 style={{color:'#8e44ad',marginTop:10,width:'20%'}} ><i>#{category.name}</i></h2>
            
            <List
            style={{width:'auto',height:200,overflow:'auto'}}
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
                  
                  avatar={<Avatar src={item.cover}/>}
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
          </TabPane>
        </Tabs>
            
            </Col>
            </Row>    

                
            </div>
            </div>


      )
    }
}

const mapStateToProps=state=>{
  return{
    results:state.song.results,
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    searchResults:(query)=>dispatch(songActions.searchAll(query)),
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


export default connect(mapStateToProps,mapDispatchToProps)(SearchResults)