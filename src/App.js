import React from 'react';
import './App.css';
import Router from './routes'
import {BrowserRouter} from 'react-router-dom';
import Main from './layouts/main'
import * as authActions from './store/actions/authActions'
import {connect} from 'react-redux'

class App extends React.Component{
  componentWillMount() {
    this.props.loginCheck()
}
  render(){
  return (
    <div className="App">
    <BrowserRouter>
      <Main {...this.props}>
      <Router/>
      </Main>
        
    </BrowserRouter>

    </div>
  );
}
}
const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null,
    currentSong:state.player.currentTrack

  }
}


const mapDispatchToProps=dispatch=>{
  return{
    loginCheck:()=>dispatch(authActions.authCheck())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);