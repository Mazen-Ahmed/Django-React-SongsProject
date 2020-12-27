import React, { Component } from 'react'

import {Nav,Navbar,NavDropdown} from 'react-bootstrap'
import SignedOutLinks from '../components/signedOutLinks'
import SignedInLinks from '../components/signedInLinks'
import {connect} from 'react-redux'
import * as authActions from '../store/actions/authActions'
import {Redirect,Link} from 'react-router-dom'


class Nav_Bar extends Component {

    render() {
      console.log(this.props.bg)
      let links=this.props.isAuthenticated ? <SignedInLinks props={this.props.bg} /> : <SignedOutLinks props={this.props.bg}/>
        return (
            <div>
            {links}
                
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
      login:(username, password)=>dispatch(authActions.authLogin(username, password))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Nav_Bar);