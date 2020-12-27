import React from 'react';
import { Form, Input,Col, Alert,Button } from 'antd';
import {UnlockOutlined,LoadingOutlined ,UserOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import * as authActions from '../store/actions/authActions'
import {Redirect,Link} from 'react-router-dom'
import Nav_Bar from '../layouts/nav'
import {Spinner} from 'react-bootstrap'
import FormItem from 'antd/lib/form/FormItem';
import GoogleLogin from 'react-google-login'

const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log(e, 'I was closed.');
};


const antIcon = <center><LoadingOutlined style={{ fontSize: 40,color:'#8e44ad' }} spin /></center>;

class LoginForm extends React.Component {

  responseGoogle=(response)=>{
    console.log(response);
     this.props.authGoogleLogin(response.accessToken,response.profileObj.givenName)
  }

  handleSubmit = e => {
    e.preventDefault()
    const name=e.target.username.value;
    const password=e.target.password.value;
    console.log(name,password)
    this.props.login(name,password)
  };

  render() {
    
    if(this.props.isAuthenticated  ) return <Redirect to='/' />
    return (

        <div className='header' style={{width:'100%',minHeight:710,backgroundColor:'#8e44ad'}}>
          <div xs={24} sm={24} md={24} lg={24} xl={24} style={{minHeight:710,backgroundColor:'rgba(0,0,0,0.8)',paddingTop:100}}>
                          <Nav_Bar bg='dark'/>

        <center>
        <Col xs={18} sm={18} md={12} lg={10} xl={7} style={{borderRadius:5,backgroundColor:'#fff',paddingTop:50,paddingBottom:5,minHeight:400}}>
        {this.props.error
  ?
  
    Object.keys(this.props.error).map((key)=> {
         return this.props.error[key] && this.props.error[key].map(msg => <div><Alert
                                                      message="wrong username or password"
                                                      description={msg}
                                                      type="error"
                                                      closable
                                                      style={{width:'auto',padding:15}}
                                                      onClose={onClose}
                                                    />      
                                                  </div>)
    })

  
  :
  ''
  }
  
                  <h1 style={{color:'#8e44ad',fontWeight:1000,marginBottom:10}}>Sign In</h1> 

      <Form onSubmitCapture={this.handleSubmit} style={{width:'auto',padding:15}} className="login-form">
        <Form.Item style={{ color: 'rgba(0,0,0,.25)'}}>
        <label htmlFor="username" style={{ color: 'rgba(0,0,0,.25)',float:"left" }}>E-mail</label>
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)',borderRadius:20}} />}
              placeholder="Email"
              name='username'
              required
              type='email'
              disabled={this.props.loading}
            />
        </Form.Item>
        <Form.Item>
        <label htmlFor="password" style={{ color: 'rgba(0,0,0,.25)',float:"left" }}>Password</label>

            <Input
              prefix={<UnlockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              name='password'
              required
              disabled={this.props.loading}
            />
          
        </Form.Item>
        <Form.Item>
         
       
          <Button htmlType="submit" style={{width:'100%',backgroundColor:'#8e44ad',color:'#fff',border:'none',paddingBottom:20,borderRadius:4}} loading={this.props.loading}  className="login-form-button">
            Sign in
          </Button> &nbsp;
          <br/>
          <GoogleLogin
        clientId='627485290456-hruf3gncmr0tmls192r3utrevdbp0dt9.apps.googleusercontent.com'
        buttonText='Continue With Google '
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        style={{width:'auto',padding:15}}

        className='signInButton'
          cookiePolicy={'single_host_origin'}
        
        />
        </Form.Item>
      
        <FormItem>
           Or <Link to='/signup'>register now!</Link>
        </FormItem>
      </Form>
  
      </Col>
      </center>
      </div>
      </div>
    );
  }
}
const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null,
    loading:state.auth.loading,
    error:state.auth.error,
  }
}  

const mapDispatchToProps=dispatch=>{
  return{
    login:(email, password)=>dispatch(authActions.authLogin(email, password)),
    authGoogleLogin:(accessToken,givenName)=>dispatch(authActions.authGoogleLogin(accessToken,givenName))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
