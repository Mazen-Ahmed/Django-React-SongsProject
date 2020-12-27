import React from 'react'
import {Route} from 'react-router-dom'
import Home from './components/home'
import SignIn from './components/SignIn'
import Signup from './components/SignUp'
import AllSongs from './components/songs' 
import Upload from './components/upload' 
import SingleSong from './components/singleSong'
import Playlists from './components/playlists'
import SinglePlaylist from './components/singlePlaylist'
import SingleCategory from './components/singleCategory'
import SingleUser from './components/singleUser'
import UserProfile from './components/profile'
import SearchResults from './components/searchResults'
const Router=()=>(
    <div>
    <Route exact path='/' component={Home}/> 
    <Route exact path='/signin' component={SignIn}/>
    <Route exact path='/signup' component={Signup}/>
    <Route exact path='/songs' component={AllSongs}/>
    <Route exact path='/uploads' component={Upload}/>
    <Route exact path='/song/:songID' component={SingleSong}/>
    <Route exact path='/playlists' component={Playlists}/>
    <Route exact path='/playlist/:playlistID' component={SinglePlaylist}/>
    <Route exact path='/category/:catID' component={SingleCategory}/>
    <Route exact path='/user/:userID' component={SingleUser}/>
    <Route exact path='/profile' component={UserProfile}/>
    <Route exact path='/search/:query' component={SearchResults}/>
    </div>
)

export default Router;