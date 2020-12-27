import React from 'react'
import {Nav,Navbar,NavDropdown} from 'react-bootstrap'
import { Input,Button} from 'antd'
import {Link,Redirect,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {CheckCircleFilled,SearchOutlined } from '@ant-design/icons';
import * as songActions from '../store/actions/songActions'
import * as authActions from '../store/actions/authActions'

const  SignedInLinks=(props)=> {

  function searchAll(value){
   
    props.history.push(`/search/${value}`)

  }
  let color=null
  let icon=null
  if(localStorage.getItem('user_type')==='Normal'){
    color='#dfe6e9'
    icon=null
  }else if(localStorage.getItem('user_type')==='Premium'){
    color='#8e44ad'
    icon=<CheckCircleFilled style={{color:'#8e44ad'}}/>
  }else{
    color='#c0392b'
    icon=<CheckCircleFilled style={{color:'#c0392b',marginLeft:2,fontSize:16}}/>

  }
  const { Search } = Input;
console.log(localStorage.getItem('avatar'));
  return (

        <div>
 
        
<Navbar collapseOnSelect expand="lg" bg={props.props} className='fixed-top' style={{backgroundColor:'transparent',paddingLeft:'3%',paddingRight:'3%'}} variant="dark">
<Link to='/'><Navbar.Brand href="#home">DJ-Music</Navbar.Brand></Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
   
      <Link to='/songs'> <Nav.Link href="#deets" eventKey={4} >
      Explore
      </Nav.Link></Link>
      <Link to='/playlists'>
       <Nav.Link  href="#d2eets" eventKey={2} >
      Playlists
      </Nav.Link>
      </Link>
      <Link to='/uploads'> <Nav.Link  href="#deets" eventKey={5} >
      uploads
      </Nav.Link>
      </Link>
     
      
          
        
    </Nav>
<>
    <Search
      placeholder="Search..."
      onSearch={value => searchAll(value)}
      style={{ width:300,marginRight:'30%' }}
    />


</> 
    <Nav>
  <NavDropdown title={<span><img src={localStorage.getItem('avatar')} style={{borderRadius:'50%',border:`2px ${color} solid `,width:20,height:20}}/> {localStorage.getItem('username')} </span>} id="basic-nav-dropdown">
    <Link to='/profile'><NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item></Link>

    <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.5">Followers</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Following</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">Liked</NavDropdown.Item>
      </NavDropdown>
    
    <Nav.Link eventKey={2}  onClick={()=>props.logout()}>
       logout
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

        </div>
    )
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
    login:(username, password)=>dispatch(authActions.authLogin(username, password)),
    logout:()=>dispatch(authActions.logout()),
    searchAll:(query)=>dispatch(songActions.searchAll(query))
}

}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignedInLinks));