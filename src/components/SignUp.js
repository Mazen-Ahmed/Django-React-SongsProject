import React from 'react';
import { Form, Input, Col,Button, Alert } from 'antd';
import {UnlockOutlined,MailOutlined ,UserOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import * as authActions from '../store/actions/authActions'
import {Redirect,Link} from 'react-router-dom'
import FormItem from 'antd/lib/form/FormItem';
import Nav_Bar from '../layouts/nav'

const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log(e, 'I was closed.');
};
class Signup extends React.Component {
    

  handleSubmit = e => {
    e.preventDefault()
    const name=e.target.username.value;
    const email=e.target.email.value;
    const password1=e.target.password1.value;
    const password2=e.target.password2.value;
    console.log(name,email,password1,password2)
    this.props.signup(name,email,password1, password2)
  };

    render() {
   
  
        if(this.props.isAuthenticated) return <Redirect to='/' />
    return (

        <div className='header' style={{width:'100%',minHeight:700,backgroundColor:'#8e44ad'}}>
            <div style={{width:'100%',minHeight:700,backgroundColor:'rgba(0,0,0,0.8)',paddingTop:20}}>
                                      <Nav_Bar bg='dark'/>


        <center>
            
        <Col   xs={18} sm={18} md={12} lg={10} xl={7} className='container' style={{borderRadius:5,marginTop:50,backgroundColor:'#fff',paddingTop:50,paddingBottom:5,minHeight:500}}>
        {this.props.error
  ?
  
  Object.keys(this.props.error).map((key)=> {
    return this.props.error[key] && this.props.error[key].map(msg => <div><Alert
                                                 message={key}
                                                 description={msg}
                                                 type="error"
                                                 closable
                                                 style={{width:'auto',padding:15}}
                                                 onClose={onClose}
                                               />      <br/>
                                             </div>)
})
  :
  ''
  }
                  <h1 style={{color:'#8e44ad',fontWeight:1000,marginBottom:10}}>Sign Up</h1> 
      <Form onSubmitCapture={this.handleSubmit} style={{width:'auto',padding:15}} className="login-form">
        <Form.Item>
        <label htmlFor="username" style={{ color: 'rgba(0,0,0,.25)',float:"left" }}>Username</label>

            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              required
              disabled={this.props.loading}

              name='username'
            />
        </Form.Item>
        <Form.Item>
        <label htmlFor="email" style={{ color: 'rgba(0,0,0,.25)',float:"left" }}>E-mail</label>

            <Input
              prefix={<MailOutlined  style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              required
              placeholder="Email"
              disabled={this.props.loading}

              name='email'
            />
        </Form.Item>
        <Form.Item>
        <label htmlFor="password1" style={{ color: 'rgba(0,0,0,.25)',float:"left" }}>Password</label>

            <Input
              prefix={<UnlockOutlined    style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
              type="password"
              required
              name='password1'
              disabled={this.props.loading}

            />
        </Form.Item>
        <Form.Item>
        <label htmlFor="password2" style={{ color: 'rgba(0,0,0,.25)',float:"left" }}>Password(Confirmation)</label>

            <Input
              prefix={<UnlockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              required
              type="password"
              placeholder="Password(confirmation)"
              name='password2'
              disabled={this.props.loading}

            />
          
        </Form.Item>
        <Form.Item>
         
        <Button htmlType="submit" style={{width:'100%',backgroundColor:'#8e44ad',color:'#fff',border:'none',paddingBottom:20,borderRadius:4}} loading={this.props.loading} className="login-form-button">
            Sign up
          </Button> &nbsp;
          
        </Form.Item>
        <FormItem>
           Or <Link to='/signin'>already have account ?!</Link>
        </FormItem>
      </Form>
      </Col>
      </center>
      </div>
    </div>
    )
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
      signup:(username, email, password1, password2)=>dispatch(authActions.authSignup(username, email, password1, password2))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Signup)