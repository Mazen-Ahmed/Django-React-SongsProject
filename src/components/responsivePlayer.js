import React,{useState, useRef} from 'react'
import {PlayCircleOutlined,UnorderedListOutlined ,HeartOutlined,PauseCircleOutlined,HeartFilled ,StepBackwardOutlined,StepForwardOutlined,NodeExpandOutlined,RetweetOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import * as songActions from '../store/actions/songActions'
import * as playerActions from '../store/actions/playerActions1'
import { List, Avatar,Tooltip,Row,Slider,Col,Modal,Button } from 'antd';
import { Link } from 'react-router-dom';
import Controls from '../layouts/controls'




const ResponsivePlayer =(props)=> {
const audio = useRef('audio_tag');
const [statevolum, setStateVolum] = useState(1)
const [dur, setDur] = useState(0)
const [modal2Visible,setVisible]=useState(false)
const [currentTime, setCurrentTime] = useState(0)
const [repeat,setRepeat]=useState(false)
const fmtMSS = (s) => { return (s - (s %= 60)) / 60 + (10 < s ? ':' : ':0') + ~~(s) }
let urls=props.currentSong.file || localStorage.getItem('file')
let auto= props.paused  ? false : true
   const togglePlaying=()=>{
    const audio = document.getElementById('Aud');
    props.play(audio);
   }
  const aud = document.getElementById('Aud');  
  const sl=document.getElementById('prg');

   
const handleEnd=()=>{
     const sgs=JSON.parse(localStorage.getItem('playlist'))
     let songId= JSON.parse(localStorage.getItem('id'))
     let currentIndex=sgs.findIndex(song=>song.id===songId)


    if (sgs[currentIndex] === sgs.length-1  ){
       currentIndex=0
       props.setCurrentSong(sgs[currentIndex].id)

     }
   
    else{
        let next=currentIndex+1
        if(next >= sgs.length-1){
          next=0
          props.setCurrentSong(sgs[next].id)

        }
        else{
          props.setCurrentSong(sgs[next].id)

        }
    }
   }


const handleNextPrev=(np)=>{
  const sgs=JSON.parse(localStorage.getItem('playlist'))
  let songId= JSON.parse( localStorage.getItem('id'))
  let currentIndex=sgs.findIndex(song=>song.id===songId)
  if(np==='next')
  {
            
            if (currentIndex === sgs.length-1 )
            {

                currentIndex=0
                props.setCurrentSong(sgs[currentIndex].id)

            }else{
                const next=currentIndex+1
                props.setCurrentSong(sgs[next].id)
            }
    }
    else if(np==='prev')
    {
            if (currentIndex === 0 )
            {
              props.setCurrentSong(sgs[sgs.length-1].id)
            } 
            else
            {
              const previous=currentIndex-1
              props.setCurrentSong(sgs[previous].id)
            }
    }
    
}
const setPlay=(id)=>{
  props.setCurrentSong(id)
  props.setPlaylist(JSON.parse(localStorage.getItem('playlist')))
}

const handleProgress = (value) => {
      let compute = (value * props.duration) / 100;
      props.setCurrentTime(compute)
      aud.currentTime = compute
      console.log(aud.currentTime);
    }
  
const handleVolume = (q) => {
  setStateVolum(q);
  aud.volume = q;
}
const handleUpdate=(val)=>{
  setCurrentTime(val)
  localStorage.setItem('currentT',val)
}
let songId=props.currentSong && props.currentSong.id || localStorage.getItem('id')&&localStorage.getItem('id')


let songName=null
if(localStorage.getItem('songName')&&localStorage.getItem('songName').length > 43){
      songName=localStorage.getItem('songName').substr(0,40)+'...'
}else{
      songName=localStorage.getItem('songName')
}

        return (
            <div  >
              

          <Modal
          title="Current Playlist"
          centered
          visible={modal2Visible}
          style={{top: 0 }}
          closable={false}
          footer={[
            <Button type='primary' key="back" onClick={() => setVisible(false)}>
              Ok
            </Button>,
          ]}
        >
           <List
            style={{width:'100%',overflow:'auto',height:300 }}
            dataSource={JSON.parse(localStorage.getItem('playlist'))}
            loading={props.loading}
            renderItem={item => (
              <List.Item key={item.id}  
               actions={[
                songId===item.id
                ?
                <p style={{color:'#8e44ad'}}>
                Now Playing
                </p>
                :
              <Tooltip placement="bottom" title='Play'>
              <a key="list-loadmore-edit"onClick={()=>setPlay(item.id)}  >
              <PlayCircleOutlined style={{fontSize:20,color:'#8e44ad'}} /></a></Tooltip>
              
            ]}>
              <List.Item.Meta
                  avatar={<Avatar src={item.cover}/>}
                  title={<Link to={`/song/${item.id}`}>{item.name} </Link>}
                  description={item.upload_date}
                />
                
              </List.Item>
            )}
          />
        </Modal>
            <Row  style={{paddingLeft:70}}>
           <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <img src={localStorage.getItem('songCover')} /> <br/>
          <h3 style={{marginTop:25,width:'100%'}} >  <Link style={{color:'#8e44ad',overflow:'auto'}}   to={`/song/${props.currentSong.id || localStorage.getItem('id')}`}>{songName}</Link></h3>

           </Col>
           </Row>
           <Row style={{marginLeft:120}}> 
           <Col xs={24} sm={24} md={24} lg={24} xl={24}>
           <div >
            <span style={{fontSize:35,cursor:'pointer'}} onClick={()=>{handleNextPrev('prev')}}  ><StepBackwardOutlined /></span>
            <span  style={{fontSize:35,cursor:'pointer'}}   >
            <span onClick={togglePlaying.bind(this)} >
                
            {props.paused ?<PlayCircleOutlined/>:<PauseCircleOutlined/>}
            </span>
         
            </span>
            <span  style={{fontSize:35,cursor:'pointer'}} onClick={()=>{handleNextPrev('next')}}  ><StepForwardOutlined /></span>
            </div>
           </Col>
           </Row >
           <Row style={{marginLeft:50}}>
           <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className='progressb2' >
           <span className='currentT' >{props.currentTime ? fmtMSS(props.currentTime): '0:00'}</span>
       
        
           <input
        type='range'
        dots='true'
        onChange={(e)=>handleProgress(e.target.value)}
        value={props.duration ? (props.currentTime * 100) / props.duration : 0}
        tooltipVisible={false}
        style={{marginBottom:15,marginRight:25,cursor:'pointer'}}
        class='progressb'    
        id='prg'
        />

                <span className='totalT'>{props.duration ?  fmtMSS(props.duration): '0:00'}</span>
           </div >
           </Col>
           </Row>
            </div>
        )



    }
    const mapStateToProps=state=>{
        return{
          isAuthenticated:state.auth.token!==null,
          loading:state.song.loading,
          paused:state.player.paused,
          duration:state.player.duration,
          currentTime:state.player.currentTime,
          songs:state.player.songs,
          currentSong:state.player.currentTrack      
        }
      }  
      
      const mapDispatchToProps=dispatch=>{
        return{
          play:(audio)=>dispatch(playerActions.play(audio)),
          searchUploadings:(name,token)=>dispatch(songActions.searchUploadings(name,token)),
          listCategories:()=>dispatch(songActions.getCategories()),
          setCurrentSong:(id,token)=>dispatch(playerActions.setCurrentSong(id,token)),
          ToggleLike:(token,id)=>dispatch(songActions.uploadToggleLike(token,id)),
          setListeningHistory:(song_id,token)=>dispatch(playerActions.setListeningHistory(song_id,token)),
          setPlaylist:(playlist)=>dispatch(playerActions.setPlaylist(playlist)),
          setCurrentTime:(value)=>dispatch(playerActions.setCurrentTime(value)),

        }
      }
      
      export default connect(mapStateToProps,mapDispatchToProps)(ResponsivePlayer);