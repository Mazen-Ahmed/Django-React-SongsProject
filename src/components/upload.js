import React from 'react';
import {Form,Input,Button,Alert,Progress,Col,Avatar,List,Row,Tooltip,Modal ,message, Select, Divider} from 'antd'
import {PlayCircleOutlined,PlusCircleOutlined,CloudUploadOutlined,LoadingOutlined,DeleteOutlined,UploadOutlined,HeartFilled ,HeartOutlined ,SearchOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'
import Nav_Bar from '../layouts/nav'
import FormData from 'form-data';
import { Icon } from 'semantic-ui-react'
import * as playerActions from '../store/actions/playerActions1'
import * as songActions from '../store/actions/songActions'



const antIcon = <center><LoadingOutlined style={{ fontSize: 40,color:'#8e44ad' }} spin /></center>;

class Uploads extends React.Component {
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
    this.props.getuploadings(localStorage.getItem('token'))
    this.props.listCategories()
    this.props.getPlaylistsToAdd(localStorage.getItem('token'))
  }

handleFile=event=>{
    this.setState({file:event.target.files[0]})
  }
handleCategory=value=>{
  this.setState({category:value},()=>console.log(this.state.category))

}
handleLike=(id)=>{
  this.props.ToggleLike(localStorage.getItem('token'),id)

}

setPlay=(id)=>{
  this.props.getCurrentSong(id)
  this.props.setPlaylist(this.props.songs)
}

handleInput=(e)=>{
  if(e.target.value ){
  this.setState({width:'30%'})    
  }
  else{
    this.setState({width:'16%'})    

  }
}
handleSubmit = (e) => {
    e.preventDefault()  
    const data = new FormData() 
    data.append('name', e.target.songname.value)
    data.append('song',this.state.file,this.state.file.name)
    data.append('category',this.state.category)
    data.append('token',localStorage.getItem('token'))
    if(this.state.file.name.slice((Math.max(0, this.state.file.name.lastIndexOf(".")) || Infinity) + 1)==='mp3'){
      this.props.upload(data)
      this.setState({error:null}) 
    }
    else{

     this.setState({error:'file type error'}) 
    }


  };


  showModal = (id) => {
    this.setState({
      visible: true,
      songid:id
    });
    console.log(id);
  };
  handleAddToPlaylist = (id) => {
    this.props.addToPlaylist(this.state.songid,id)
  };  

  handleCancel = () => {
    this.setState({ visible: false });
  };
 handleSearch=(e)=>{
   this.setState({
     searchs:e.target.value
   },()=>this.props.searchUploadings(this.state.searchs,localStorage.getItem('token')))
 }
  render() {
  let likeMessage=null
  let mess=null
     
      if(this.props.message){
        likeMessage=message.info({content:this.props.message,duration:1,style:{marginTop:50}})
        this.props.afterLike()
        this.props.getuploadings(localStorage.getItem('token'))
      }

    let songId=this.props.currentSong && this.props.currentSong.id || localStorage.getItem('id')&&localStorage.getItem('id')

      console.log(songId);
    if(!this.props.isAuthenticated  ) return <Redirect to='/signin' />
    return (

        <div style={{width:'100%',minHeight:710,backgroundColor:'#ecf0f1',paddingTop:1,paddingBottom:50}}>
       
                        <Nav_Bar  bg='dark'/>
        
        <div className='container-fluid' style={{borderRadius:5,padding:50,paddingBottom:5,width:'100%',minHeight:500}}>

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
        {mess}
        {likeMessage}
       
               <Row>  

            <Col xs={24} sm={24} md={24} lg={24} xl={14} style={{borderRight:'2px #ecf0f1 solid'}}>
         
            <div className='container-fluid' style={{backgroundColor:'#fff',marginRight:20,paddingTop:5,height:550,paddingLeft:20,paddingRight:20,paddingBottom:20}}> 
            <Input
        onChange={this.handleSearch}
        style={{marginBottom:20,width:'40%',background:'#ecf0f1'}}
        prefix={<SearchOutlined  style={{ color: 'rgba(0,0,0,.25)',borderRadius:20}} />}
    icon={<Icon name='search' inverted circular link />}
    placeholder='Search by song name or category...'
    onFocus = {this.handleInput}
    className='inp'
  /> 
           <h3 style={{color:'#8e44ad'}}><CloudUploadOutlined  style={{fontSize:30}}/> My Uploads  </h3> 
            <div style={{width:'100%',height:400,overflow:'auto'}}>

           
            <List
            style={{marginTop:40}}
            dataSource={this.props.songs}
            loading={this.props.getLoad}
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
              <a key="list-loadmore-edit"onClick={()=>this.setPlay(item.id)}  >
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
            ,
              <Tooltip placement="bottom" title='Add To Playlist'>
              <a key="list-loadmore-more" >
              <PlusCircleOutlined style={{fontSize:20,color:'#8e44ad'}} onClick={()=>this.showModal(item.id)}  /></a></Tooltip>
            ]}>
              <List.Item.Meta
                  
                  avatar={<Avatar src={item.cover}/>}
                  title={<Link to={`/song/${item.id}`}>{item.name} {item.category.name ?<span style={{backgroundColor:`${item.category.label}`,padding:5,color:'#fff',borderRadius:3}}>{item.category.name}</span>: ''}</Link>}
                  description={item.upload_date}
                />
                
              </List.Item>
            )}
          /> </div>
            </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={10}>
                      <div className='container-fluid'  style={{backgroundColor:'#fff'}}>
                      <h3 style={{color:'#8e44ad'}}><CloudUploadOutlined  style={{fontSize:30}}/> Upload New Song  </h3> 

                      <center style={{marginTop:50}}>

                      {this.props.error
                        ?
                          <Alert
                          message='couldnt upload your song'
                          description={this.props.error.message}
                          type="error"
                        
                          style={{width:200}}
                        />
                        :
                        ''
                        }
                        {this.state.error
                        ?
                          <Alert
                          message='unsportted file type'
                          description='try out another file please'
                          type="error"
                        
                          style={{width:350}}
                        />
                        :
                        ''
                        }


                        { this.state.file
                        ?
                        <>
    <Progress strokeLinecap="square" percent={this.props.progress} />
                         </>
                          :
                          ''
                    }
                     

<Form onSubmitCapture={this.handleSubmit} datatype=''  style={{width:'auto'}} className="login-form">
        <Form.Item>
       <h3>drag or select files in the area below</h3>
             <UploadOutlined   style={{position:'relative',fontSize:200,color:'#8e44ad',cursor:'pointer',height:250,width:'100%'}}/>
            <input
            
              disabled={this.props.loading}
             onChange={this.handleFile}
              type="file"
              style={{opacity:0,top:0,height:250,position:'absolute',width:'100%',cursor:'pointer'}}
              required
            />
               
        </Form.Item>
        
        <buton
            style={{width:'100%',marginBottom:20,paddingBottom:10,cursor:'pointer'}}
            onClick={()=>this.fileInput.click()}
              required
              
            >
              
            </buton>

          {this.state.file ? <div><h3> Selected: </h3><p>{this.state.file.name}</p></div>: ''}
        
        {this.state.file
        ?
        <div>
        <Form.Item>
         <Input
         
           disabled={this.props.loading}
           placeholder="song name"
           name='songname'
           defaultValue={this.state.file.name}

           required
         />
        </Form.Item>
         <Form.Item>
         <Select
           disabled={this.props.loading}
           placeholder="Category"
           name='categ'
           required
           onChange={this.handleCategory}
           defaultValue="Select Category (not mandatory)"
         >
                               
                               <option key='0' > None <Divider/> </option>
                              
           {this.props.categories && this.props.categories.map(category=>{return(

            <option key={category.id} value={category.id}>{category.name}</option>
           )})
          
           }
           </Select> 
        </Form.Item>
        </div>
         :
         ''
        }
          <Button htmlType="submit" style={{width:'70%',backgroundColor:'#8e44ad',color:'#fff',border:'none',marginBottom:30,borderRadius:20}} loading={this.props.loading}  className="login-form-button">
            Upload {this.props.prog ? <h5>{this.props.prog}</h5>:'' }
          </Button> &nbsp;
          
           
      </Form>
      </center>
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
    songs:state.song.songs,
    successMessage:state.song.success,
    error:state.song.error,
    addError:state.song.addError,
    categories:state.song.categories,
    playlists:state.song.playlists,
    playlistsToAdd:state.song.playlistsToAdd,

    currentSong:state.player.currentTrack,
    progress:state.song.progress

  }
}  

const mapDispatchToProps=dispatch=>{
  return{
    upload:(data)=>dispatch(songActions.uploadSongs(data)),
    getuploadings:(token)=>dispatch(songActions.myUploads(token)),
    searchUploadings:(name,token)=>dispatch(songActions.searchUploadings(name,token)),
    listCategories:()=>dispatch(songActions.getCategories()),
    delete:(id,token)=>dispatch(songActions.deleteMyUpload(id,token)),
    getCurrentSong:(id)=>dispatch(playerActions.setCurrentSong(id)),
    ToggleLike:(token,id)=>dispatch(songActions.uploadToggleLike(token,id)),
    setPlaylist:(playlist)=>dispatch(playerActions.setPlaylist(playlist)),
    afterLike:()=>dispatch(songActions.afterLike()),
    addToPlaylist:(song_id,playlist_id)=>dispatch(songActions.addToPlaylist(song_id,playlist_id)),
    getPlaylistsToAdd:(token)=>dispatch(songActions.getPlaylistsToAdd(token)),

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Uploads);
