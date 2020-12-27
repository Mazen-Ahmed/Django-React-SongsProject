import React, { Component } from 'react'
import Nav_Bar from '../layouts/nav'
import { Col ,Row,Tabs,Alert,Button,Input,Form,message} from 'antd'
import {CheckCircleFilled,UnlockOutlined,EditOutlined ,DeleteOutlined } from '@ant-design/icons';
import {Redirect} from 'react-router-dom'
import music from '../music.jpg'
import * as userActions from '../store/actions/userActions'
import * as playerActions from '../store/actions/playerActions1'
import * as songActions from '../store/actions/songActions'
import {connect} from 'react-redux'
import FormData from 'form-data';
const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log(e, 'I was closed.');
};
let color=null
let icon=null
class UserProfile extends Component {
  state={
    file:null
  }
    componentDidMount(){
        this.props.getUserProfile(localStorage.getItem('token'))
        
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


      handleChangePassword=(e)=>{
        e.preventDefault()
        this.props.updateUserPassword(e.target.password1.value,e.target.password2.value,e.target.password3.value,localStorage.getItem('token'))
      }
      handleEdit=(e)=>{
        e.preventDefault()

        const data=new FormData()
        
        this.setState({file:e.target.files[0]},()=>{
          data.append('avatar',this.state.file,this.state.file.name)
          data.append('token',localStorage.getItem('token'))
          this.props.updateUserImage(data)
          this.props.getUserProfile(localStorage.getItem('token'))
        })
       
      
      }
render() {
let songId=this.props.currentSong && this.props.currentSong.id || localStorage.getItem('id')&&localStorage.getItem('id')
console.log(this.props.profile.avatar);

const dark='dark'
    
const { TabPane } = Tabs
console.log(this.props.playlists);
let mess=null
if(!this.props.isAuthenticated  ) return <Redirect to='/' />


  if(this.props.message){
    mess=message.info({content:this.props.message,duration:1,style:{marginTop:50}})
  }
return (
           
<div style={{width:'100%',minHeight:700,backgroundColor:'#ecf0f1',paddingTop:1,paddingBottom:50}}>
                  <Nav_Bar  bg={dark}/>
                  {mess}
<div className='container-fluid' style={{borderRadius:5,padding:50,paddingBottom:5,width:'100%',minHeight:300}}>
            <Row >
                <Col xs={24} sm={24} md={24} lg={12} xl={8} style={{borderRight:'2px #ecf0f1 solid',borderBottom:'2px #ecf0f1 solid',minHeight:400,backgroundColor:'#ffff',paddingLeft:10,paddingRight:20,paddingTop:5}}>
                <center>
                  <span>
                    
                <Button htmlType="submit" onClick={()=>this.avatar.click()}
                 style={{width:'30%',marginTop:5,backgroundColor:'#8e44ad',color:'#fff',border:'none',marginBottom:20,borderRadius:4,padding:5,float:"right"}} loading={this.props.loading}  className="login-form-button">
                        <EditOutlined/>Edit Avatar
                        </Button> &nbsp;
                        <br/><br/><br/>
                  <img src={this.props.profile.avatar} style={{borderRadius:'50%',height:200,zIndex:-1,width:200,border:`5px ${this.handleBorder(this.props.profile.user_type)} solid`}}/>
                  </span>
                <input type="file" style={{display:'none'}} onChange={(e)=>this.handleEdit(e)}name='upload' ref={avatar=>this.avatar=avatar}/>
          
                <h3 >{this.props.profile.username}{this.iconHandle(this.props.profile&&this.props.profile.user_type)} </h3>
                
                <span style={{backgroundColor:`${this.handleBorder(this.props.profile && this.props.profile.user_type)}`,fontSize:15,borderRadius:3,padding:2,color:'#fff'}}>{this.props.profile.user_type}</span>
                
                <h4 style={{marginTop:10}} >Followers : {this.props.profile.followers_count}</h4>
                <h4 style={{marginTop:10}} >Following : {this.props.profile.following_count}</h4>

                </center>
                </Col>

                <Col xs={24} sm={24} md={24} lg={12} xl={16} style={{backgroundColor:'#ffff',color:'red',minHeight:400,paddingLeft:20,paddingRight:20,paddingTop:5}}>
               
                <center>
 {this.props.error
  ?
  
    Object.keys(this.props.error &&this.props.error).map((key)=> {
         return this.props.error && this.props.error[key].map(msg => <div><Alert
                                                     
                                                      description={msg}
                                                      type="error"
                                                      closable
                                                      style={{width:450,marginLeft:'20%',marginBottom:3}}
                                                      onClose={onClose}
                                                    />      
                                                  </div>)
    })

  
  :
  ''
  }
                                    <h1 style={{color:'#8e44ad',fontWeight:1000,marginBottom:10}}>Change Password</h1> 

                    <Form onSubmitCapture={this.handleChangePassword} style={{width:350}} className="login-form">
                  
                    <Form.Item>
                    <label htmlFor="password" style={{ color: 'rgba(0,0,0,.25)',float:"left" }}>New Password</label>
                        <Input
                            prefix={<UnlockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            name='password1'
                            required
                            disabled={this.props.loading}
                        />
                        
                    </Form.Item>

                    <Form.Item>
                    <label htmlFor="password" style={{ color: 'rgba(0,0,0,.25)',float:"left" }}>Confirm New Password</label>
                        <Input
                            prefix={<UnlockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password(Confirmation)"
                            name='password2'
                            required
                            disabled={this.props.loading}
                        />
                        
                    </Form.Item>


                    <Form.Item>
                    <label htmlFor="password" style={{ color: 'rgba(0,0,0,.25)',float:"left" }}>Old Password</label>
                        <Input
                            prefix={<UnlockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Old Password"
                            name='password3'
                            required
                            disabled={this.props.loading}
                        />
                        
                    </Form.Item>
                    <Form.Item>
                    
                    
                        <Button htmlType="submit" style={{width:'100%',backgroundColor:'#8e44ad',color:'#fff',border:'none',paddingBottom:20,borderRadius:4}} loading={this.props.loading}  className="login-form-button">
                        Update
                        </Button> &nbsp;
                        
                    </Form.Item>
                   
                    </Form>
                
                    </center>

</Col>

</Row>
                
                
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticated:state.auth.token !== null,
        profile:state.user.profile,
        playlists:state.user.playlists,
        uploads:state.user.uploads,
        loading:state.user.loading,
        error:state.user.error,
        message:state.user.success,

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
        getUserProfile:(token)=>dispatch(userActions.getUserProfile(token)),
        updateUserPassword:(password1,password2,oldPassword,token)=>dispatch(userActions.updateUserPassword(password1,password2,oldPassword,token)),
        updateUserImage:(data)=>dispatch(userActions.updateUserImage(data)),
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile)