import React from 'react';
import {List,Col,Tooltip, Row,message,Anchor ,Avatar} from 'antd';
import {UserAddOutlined,HeartFilled ,PlayCircleOutlined,HistoryOutlined,TeamOutlined,HeartOutlined,FireOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import * as songActions from '../store/actions/songActions'
import * as playerActions from '../store/actions/playerActions1'
import History from './history'
import {Redirect,Link} from 'react-router-dom'
import Nav_Bar from '../layouts/nav'
import Whotofollow from './whotofollow'



class AllSongs extends React.Component {
  componentDidMount(){
    this.props.getSuggestions(localStorage.getItem('token'))
    this.props.getLastReleases(localStorage.getItem('token'))
    this.props.getPlaylistsToAdd(localStorage.getItem('token'))
  }

  handleSubmit = e => {
    e.preventDefault()
    const name=e.target.username.value;
    const password=e.target.password.value;
    console.log(name,password)
    this.props.login(name,password)
  };
  setPlay=(id)=>{
    this.props.getCurrentSong(id)
    this.props.setPlaylist(this.props.songs)
  }
  handleLike=(id)=>{
    this.props.ToggleLike(localStorage.getItem('token'),id)
    this.componentDidMount()

  }

  setPlayHistory=(id)=>{
    this.props.getCurrentSong(id)
    this.props.setPlaylist(this.props.history)
  }

  render() {
    console.log(localStorage.getItem('playlist'));
    let songId=this.props.currentSong.file || localStorage.getItem('file')&&localStorage.getItem('file')

    const dark='dark'
    console.log(this.props.props);
    if(!this.props.isAuthenticated  ) return <Redirect to='/signin' />
    let likeMessage=null
    if(this.props.message){

      likeMessage=message.info({content:this.props.message,duration:1,style:{marginTop:50}})
        this.componentDidMount()
      }
      if(!this.props.isAuthenticated) return <Redirect to='/signin' />

    return (

<div style={{width:'100%',minHeight:710,backgroundColor:'#ecf0f1',paddingTop:1,paddingBottom:50}}>
                  <Nav_Bar  bg={dark}/>
                  {likeMessage}

<div className='container-fluid' style={{borderRadius:5,padding:50,paddingBottom:5,width:'100%',minHeight:300}}>
      <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={16}>
      <Row style={{backgroundColor:'#fff',height:400,overflow:'auto',paddingLeft:20,borderBottom:'2px #ecf0f1 solid' ,borderRight:'2px #ecf0f1 solid'}}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <h3 style={{color:'#8e44ad',marginTop:5,width:'100%'}} ><HeartOutlined style={{fontSize:25}} /> Songs you may like</h3>
              <List
            style={{width:'auto'}}
            dataSource={this.props.songs}
            loading={this.props.loading}
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
          />
          </Col >
        </Row>


        <Row style={{backgroundColor:'#fff',height:400,paddingLeft:20 ,borderRight:'2px #ecf0f1 solid',borderBottom:'2px #ecf0f1 solid'}}>
                <Col  xs={24} sm={24} md={24} lg={24} xl={24} >
              <h3 style={{color:'#8e44ad',width:'100%'}} ><FireOutlined  style={{fontSize:25}} /> New Releases</h3>
              <List
            style={{width:'auto',height:350,paddingBottom:10,overflow:'auto'}}
            dataSource={this.props.lastreleases}
            loading={this.props.loading}
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
          />
          </Col>
        </Row>
        

      </Col>

      <Col xs={24} sm={24} md={24} lg={24} xl={8}>
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
    followloading:state.song.followLoading,
    history:state.player.history,
    followlist:state.song.followlist,
    message:state.song.message,
    songs:state.song.suggestions,
    successMessage:state.song.success,
    error:state.song.error,
    categories:state.song.categories,
    currentSong:state.player.currentTrack,
    lastreleases:state.song.lastReleases,
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    getSongs:()=>dispatch(songActions.getSongs()),
    getSuggestions:(token)=>dispatch(songActions.getSuggestions(token)),
    delete:(id,token)=>dispatch(songActions.deleteMyUpload(id,token)),
    getCurrentSong:(id)=>dispatch(playerActions.setCurrentSong(id)),
    ToggleLike:(token,id)=>dispatch(songActions.uploadToggleLike(token,id)),
    getPlaylistsToAdd:(token)=>dispatch(songActions.getPlaylistsToAdd(token)),
    getListeningHistory:(token)=>dispatch(playerActions.getListeningHistory(token)),
    getLastReleases:(token)=>dispatch(songActions.getLastReleases(token)),

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllSongs);
