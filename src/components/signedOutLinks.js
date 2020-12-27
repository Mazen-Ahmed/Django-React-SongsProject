import React from 'react'
import {Nav,Navbar,NavDropdown} from 'react-bootstrap'
import {Link } from 'react-router-dom'
const SignedOutLinks=(props)=> {
    return (
        <div>

        
<Navbar collapseOnSelect expand="lg" bg={props.props} className='fixed-top'  style={{color:'#8e44ad',backgroundColor:'transparent',paddingLeft:'3%',paddingRight:'4%'}} variant="dark">
<Link to='/'><Navbar.Brand href="#home">DJ-Music</Navbar.Brand></Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
     
    </Nav>
    <Nav>
    <Link to='/signin'><Nav.Link href="#deets">Sign In</Nav.Link></Link>
      <Link to='/signup'><Nav.Link eventKey={2} href="#memes">
       Sign Up
      </Nav.Link></Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>



        </div>
    )
}

export default SignedOutLinks